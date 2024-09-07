document.getElementById("searchBtn").addEventListener("click", function() {
    const topic = document.getElementById("searchInput").value.toLowerCase();
    if (topic) {
        fetchTedTalks(topic);
    }
});

function fetchTedTalks(topic) {
    
    fetch('talks.json')
        .then(response => response.json())
        .then(data => {
            const resultsList = document.getElementById("results");
            resultsList.innerHTML = ''; 

            
            const filteredTalks = data.filter(talk =>
                talk.name.toLowerCase().includes(topic) ||
                talk.description.toLowerCase().includes(topic)
            );

            
            if (filteredTalks.length > 0) {
                filteredTalks.forEach(talk => {
                    const listItem = document.createElement("li");
                    const link = document.createElement("a");
                    link.href = `https://www.ted.com/talks/${talk.slug}`;
                    link.textContent = talk.name;
                    link.target = "_blank";
                    listItem.appendChild(link);
                    resultsList.appendChild(listItem);
                });
            } else {
                resultsList.innerHTML = '<li>No talks found.</li>';
            }
        })
        .catch(error => console.error('Error fetching TED Talks:', error));
        
}
