export const baseUrl = import.meta.env.VITE_API_URL;

const SummaryApi = {
    get_messages:{
        url:"/get_messages.php",
        method : "get"
    },
    get_users:{
        url:"/get_users.php",
        method : "get"
    },
    get_templates:{
        url:"/get_templates.php",
        method : "get"
    },
    send_message:{
        url:"/send_messages/single_concept.php",
        method : "post"
    },
    send_template:{
        url:"/send_messages/template_concept.php",
        method : "post"
    },
    get_images:{
        url:"/images.php/images",
        method : "get"
    },
    upload_images:{
        url:"/images.php/images/upload",
        method : "post"
    }
}

export default SummaryApi