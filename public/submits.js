// import fetchCommentsData from './index.js';

export default function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission
  
    const textarea = document.getElementById('add-comment');
    const value = textarea.value; // Get the submitted value
    textarea.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(textarea.value);
        }
    });

    // Created new JSON object
    (async () => {
        try {
            // const data = await fetchCommentsData();
            const data = '**************** TESTING *******************';
            console.log(data);
        } catch(error) {
            console.error(error);
        }
    })();
  

    // Do something with the submitted value
    console.log("Read: ", value);
    // Additional logic or actions
  

    // Optionally, you can reset the form
    textarea.value = '';
}



