import CallingExtensions from "@hubspot/calling-extensions-sdk";
import RelationshipMapper from './RelationshipMapper';
import EngagementUtility from './EngagementUtility';

let relationshipMapper = new RelationshipMapper();

class DialerInteractionHandler {

  callback() {
        const interactionApi = window.Five9.CrmSdk.interactionApi();
        const crmApi = window.Five9.CrmSdk.crmApi();
      
        const defaultSize = {
          width: 400,
          height: 600
        };
      
        const state = {};
      
        const cti = new CallingExtensions({
          debugMode: false,
          eventHandlers: {
            onReady: () => {
              console.log('HS is Ready');
              cti.initialized({
                isLoggedIn: true,
                sizeInfo: defaultSize
              });
            },
            onDialNumber: (data, rawEvent) => {
              const { phoneNumber } = data;
              state.phoneNumber = phoneNumber;
              console.log('HS onDialNumber: ' + JSON.stringify(data));
              
              relationshipMapper.user.hubspotUserId = data.ownerId;
              console.log('HS onDialNumber User: ' + JSON.stringify(relationshipMapper.user));

              relationshipMapper.contact.recordId = data.objectId;
              relationshipMapper.contact.phoneNumber = data.phoneNumber;
              console.log('HS onDialNumber Contact: ' + JSON.stringify(relationshipMapper.contact));

              relationshipMapper.engagement.recordId = data.objectId;
              relationshipMapper.engagement.ownerId = data.ownerId;
              relationshipMapper.engagement.type = 'CALL';
              console.log('HS onDialNumber Engagement: ' + JSON.stringify(relationshipMapper.contact));
              
              window.setTimeout(
                () =>
                  cti.outgoingCall({
                    createEngagement: true,
                    phoneNumber
                  }),
                500
              );
            },
            onEngagementCreated: (data, rawEvent) => {
              console.log('HS onEngagementCreated: ' + JSON.stringify(data));
              const { engagementId } = data;
              state.engagementId = engagementId;
              relationshipMapper.engagement.engagementId = data.engagementId;
              console.log('HS onEngagementCreated Engagement: ' + JSON.stringify(relationshipMapper.engagement));
            },
            onEndCall: (data) => {
              console.log('HS onCallEnd: ' + JSON.stringify(data));
            },
            onVisibilityChanged: (data, rawEvent) => {
              console.log('HS onVisibilityChanged: ' + JSON.stringify(data));
              if (!data.isMinimized && !data.isHidden) {  
                interactionApi.click2dial({
                  click2DialData: {
                    clickToDialNumber: relationshipMapper.contact.phoneNumber
                  }
                });
              }
            }
          }
        });
    
        crmApi.registerApi({
            getAdtConfig: function (params) {
                var config = {
                    providerName: 'Five9 HubSpot Dialer',
                    myCallsTodayEnabled: true,
                    myChatsTodayEnabled: false,
                    myEmailsTodayEnabled: false,
                    showContactInfo: false
                };
                return Promise.resolve(config);
            },
            search: function (params) {
              console.log('F9 Search: ' + JSON.stringify(params));
                var crmObjects = [{id: "123", label: "Contact", name: "Joe", isWho: true, isWhat: false, fields:[{displayName: "Company", value: "ABC"}]}];
                return Promise.resolve({crmObjects: crmObjects, screenPopObject: crmObjects[0]}); 

            },
            saveLog: function (params) {
              console.log('F9 Save Log: ' + JSON.stringify(params));
            },
            screenPop: function (params) {
              console.log('F9 Screen Pop: ' + JSON.stringify(params));
            },
            getTodayCallsCount: function (params) {
              console.log('F9 Today Call Count: ' + JSON.stringify(params));
                return Promise.resolve(77);
            },
            getTodayChatsCount: function (params) {
              console.log('F9 Today Chat Count: ' + JSON.stringify(params));
                return Promise.resolve(77);;
            },
            getTodayEmailsCount: function (params) {
              console.log('F9 Today Email Count: ' + JSON.stringify(params));
                return Promise.resolve(11);;
            },
            openMyCallsToday: function (params) {
              console.log('F9 Open My Calls Today: ' + JSON.stringify(params));
            },
            openMyChatsToday: function (params) {
              console.log('F9 Open My Chats Today: ' + JSON.stringify(params));
            },
            contactSelected: function (params, contactModel) {
              console.log('F9 Contact Selected: ' + JSON.stringify(params));
            },
            enableClickToDial: function (params) {
              console.log('F9 Enable Click 2 Dial: ' + JSON.stringify(params));
                cti.initialized({
                    isLoggedIn: true
                });
                cti.userLoggedIn();
            },
            disableClickToDial: function (params) {
              console.log('F9 Disable Click To Dial: ' + JSON.stringify(params));
            },
            _beforeCallFinished: function(params) {
              console.log('F9 Before Call Finished: ' + JSON.stringify(params));
              }
        });
    
        interactionApi.subscribe({
            callStarted: function (params) {
                console.log('F9 Call Started: ' + JSON.stringify(params));
            },
    
            callFinished: function (params) {
              let engagementId = relationshipMapper.engagement.engagementId;
              let queryString = EngagementUtility.getQueryString(engagementId, params);

              let url = '/api/engagement?' + queryString;

              console.log('F9 Call Finished: ' + JSON.stringify(params));
              cti.callCompleted({
                  createEngagement: true,
                  hideWidget: true
              });
              
              fetch(url, {
                method: 'GET',
                credentials: 'same-origin',
                mode: 'same-origin'
              })
              .then(response => response.json())
              .then(data => {
                console.log('Success: ', data);
              })
              .catch((error) => {
                console.error('Error: ', error);
              });
            },
    
            callAccepted: function (params) {
              console.log('F9 Call Accepted: ' + JSON.stringify(params));
                cti.callAnswered();
            },
    
            callRejected: function (params) {
              console.log('F9 Call Rejected: ' + JSON.stringify(params));
                cti.callEnded();
            },
    
            callEnded: function (params) {
              console.log('F9 Call Ended: ' + JSON.stringify(params));
                cti.callEnded({
                  createEngagement: true,
                  status: 'COMPLETED'
                });
            }
        });

        interactionApi.subscribeWsEvent({
          '10010': (params, content) => {
            if (content.userName && content.userId) {
              relationshipMapper.user.five9Username = content.userName;
              relationshipMapper.user.five9UserId = content.userId;
            }
            console.log('From WS New User: ' + JSON.stringify(relationshipMapper.user));
          }
        });

    
          const exit_btn = document.getElementById('exit-five9');
          exit_btn.addEventListener('click', function () {
            cti.callCompleted();
          });
          
    }
    
}

export default DialerInteractionHandler;