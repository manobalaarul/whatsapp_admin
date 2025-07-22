export const baseUrl = import.meta.env.VITE_API_URL;

const SummaryApi = {
    get_messages:{
        url:"/get_messages.php",
        method : "get"
    },
    get_users:{
        url:"/get_users.php",
        method : "get"
    }
}

export default SummaryApi