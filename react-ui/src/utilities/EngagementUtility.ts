import DispositionHandler from "./DispositionHandler";
import { env } from 'process';

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
        query.set('appId', env.HUBSPOT_APP_ID as string);

        return query.toString();
    }
}

export default EngagementUtility;