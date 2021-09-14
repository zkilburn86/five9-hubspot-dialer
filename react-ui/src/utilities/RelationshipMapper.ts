import User from "../classes/User";
import Contact from "../classes/Contact";
import Engagement from "../classes/Engagement";

class RelationshipMapper {

    user: User;
    contact: Contact;
    engagement: Engagement;

    constructor() {
        this.user = new User();
        this.contact = new Contact();
        this.engagement = new Engagement();
    }

}

export default RelationshipMapper;