

class Engagement {

    engagementId: number;
    ownerId: string;
    type: string;
    recordId: string;

    constructor() {
        this.engagementId = 0;
        this.ownerId = '';
        this.type = '';
        this.recordId = '';
    }
}

export default Engagement;