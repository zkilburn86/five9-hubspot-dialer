import CallingExtensions from "@hubspot/calling-extensions-sdk";

class DialerInteractionHandler {

  static callback = () => {
        const interactionApi = window.Five9.CrmSdk.interactionApi();
        const customComponentsApi = window.Five9.CrmSdk.customComponentsApi();
        const crmApi = window.Five9.CrmSdk.crmApi();
      
        const defaultSize = {
          width: 400,
          height: 600
        };
      
        const state = {};
      
        const cti = new CallingExtensions({
          debugMode: true,
          eventHandlers: {
            onReady: () => {
              cti.initialized({
                isLoggedIn: true,
                sizeInfo: defaultSize
              });
            },
            onDialNumber: (data, rawEvent) => {
              const { phoneNumber } = data;
              state.phoneNumber = phoneNumber;
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
              const { engagementId } = data;
              state.engagementId = engagementId;
            },
            onEndCall: () => {
              window.setTimeout(() => {
                cti.callEnded();
              }, 500);
            },
            onVisibilityChanged: (data, rawEvent) => {
            }
          }
        });
    
        crmApi.registerApi({
            getAdtConfig: function (params) {
                var config = {
                    providerName: 'Demo CRM ADT adapter',
                    myCallsTodayEnabled: true,
                    myChatsTodayEnabled: false,
                    myEmailsTodayEnabled: false,
                    showContactInfo: false
                };
                console.log({
                    data: params
                });
                return Promise.resolve(config);
            },
            search: function (params) {
                console.log({
                    data: params
                });
                var crmObjects = [{id: "123", label: "Contact", name: "Joe", isWho: true, isWhat: false, fields:[{displayName: "Company", value: "ABC"}]}];
                return Promise.resolve({crmObjects: crmObjects, screenPopObject: crmObjects[0]}); 
    
            },
            saveLog: function (params) {
                console.log({
                    data: params
                });
            },
            screenPop: function (params) {
                console.log({
                    data: params
                });
            },
            getTodayCallsCount: function (params) {
                console.log({
                    data: params
                });
                return Promise.resolve(77);
            },
            getTodayChatsCount: function (params) {
                console.log({
                    data: params
                });
                return Promise.resolve(77);;
            },
            getTodayEmailsCount: function (params) {
                console.log({
                    data: params
                });
                return Promise.resolve(11);;
            },
            openMyCallsToday: function (params) {
                console.log({
                    data: params
                });
            },
            openMyChatsToday: function (params) {
                console.log({
                    data: params
                });
            },
            contactSelected: function (params, contactModel) {
                console.log({
                    data: params
                });
            },
            enableClickToDial: function (params) {
                cti.initialized({
                    isLoggedIn: true
                });
                cti.userLoggedIn();
            },
            disableClickToDial: function (params) {
                console.log({
                    data: params
                });
            },
            _beforeCallFinished: function(params) {
                console.log({
                    data: params
                });
              }
        });
    
        interactionApi.subscribe({
            callStarted: function (params) {
                console.log({
                    data: params.callData,
                    interactionId: params.callData.interactionId
                });
                cti.outgoingCall({
                    phoneNumber: params.callData.dnis,
                    createEngagement: "true",
                    data: params.callData
                });
            },
    
            callFinished: function (params) {
                console.log({
                    data: params
                });
                cti.callCompleted({
                    engagementId: state.engagementId,
                    hideWidget: true
                });
            },
    
            callAccepted: function (params) {
                console.log({
                    data: params
                });
                cti.callAnswered();
            },
    
            callRejected: function (params) {
                console.log({
                    data: params
                });
                cti.callEnded({
                    data: params
                });
            },
    
            callEnded: function (params) {
                console.log({
                    data: params
                });
                cti.callEnded({
                  data: params
                });
            }
        });
    
        customComponentsApi.registerCustomComponents({template: `<adt-components>
              <adt-component location="3rdPartyComp-li-call-tab" label="3rdPartyComp-li-call-tab" style="flex-direction: column">
                <adt-input value="Initial value" id="aaa1" name="input1" label="Credit card1" placeholder="this is placeholder1"
                           onchange="callTabInputCallback"></adt-input>
                <adt-btn-group label="Group of buttons">
                    <!-- comments are ignored and styles are filtered by whitelisting -->
                    <adt-button name="button1" label="Yes" class="btnPrimary" style="flex-grow: 1; justify-content: center;"
                                onclick="callTabYesCallback">Yes</adt-button>
                    <adt-button name="button2" label="No" class="btnSecondary" style="flex-grow: 1"
                                onclick="callTabNoCallback"></adt-button>
                </adt-btn-group>
              </adt-component>
              <adt-component location="3rdPartyComp-li-call-details-bottom" label="3rdPartyComp-li-call-details-bottom" style="flex-direction: row; justify-content: space-between; align-items: flex-end;">
                <adt-input value="Initial value" name="input2" label="Credit card2" placeholder="this is placeholder1"
                           onchange="callDetailsInputCallback"></adt-input>
                <adt-button name="button3" label="Verify" class="btnPrimary" style="justify-content: center;"
                            onclick="callDetailsButtonCallback"></adt-button>
              </adt-component>
            </adt-components>
            `,
            callbacks: {
              callTabInputCallback: function(params){
                console.log({
                  data: params
                });
               
              },
    
              callTabYesCallback: function(params){
                console.log({
                  data: params
                });
               
              },
              callTabNoCallback: function(params){
                console.log({
                  data: params
                });
               
              },
              callDetailsInputCallback: function(params){
                console.log({
                  data: params
                });
               
              },
              callDetailsButtonCallback: function(params){
                console.log({
                  data: params
                });
               
              }
              
          }}); 
    
          const exit_btn = document.getElementById('exit-five9');
          exit_btn.addEventListener('click', function () {
            cti.callCompleted();
          });   
    };
    
}

export default DialerInteractionHandler;