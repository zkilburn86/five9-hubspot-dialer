import DispositionHandler from "./DispositionHandler";

class EngagementUtility {

    static getQueryString(engagementId: string, params: any): string {
        let five9Disposition = params.callLogData.dispositionName;
        let hubspotDispositionId = DispositionHandler.getDispositionId(five9Disposition);

        let query = new URLSearchParams();
        query.set('engagementId', engagementId);
        query.set('disposition', hubspotDispositionId);
        query.set('fromNumber', params.callData.ani);
        query.set('durationMilliseconds', params.callLogData.talkTime);
        query.set('title', params.callLogData.subject);
        query.set('recordingUrl', '');

        return query.toString();
    }
}

export default EngagementUtility;