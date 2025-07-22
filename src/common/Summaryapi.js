export const baseUrl = import.meta.env.VITE_API_URL;

const SummaryApi = {
    get_messages:{
        url:"/get_messages.php",
        method : "get"
    }
}

export default SummaryApi


// SELECT 
//   welcome_messages.*, 
//   phone_number.name, 
//   phone_number.phone,
//   phone_number.status
// FROM 
//   welcome_messages 
// JOIN 
//   phone_number 
// ON 
//   welcome_messages.client = phone_number.phone 
// GROUP BY 
//   welcome_messages.client;