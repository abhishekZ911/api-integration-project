

$(document).ready(
    $('form').submit(
        function handleSubmit(event){
            event.preventDefault();
            // $('.result-section').addClass('remove');
            $(".result-section").empty();
            let inputValue= $("#input").val();
            if(inputValue == ""){
                alert("Enter a proper word !");
                return;
            }
            $.ajax({
                url:`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`,
                method: "GET", 
                success: function(data){
                    displayData(data);
                    
                },
                error: function(xhr, status, error){

                    console.log(status, error);
                }
                
            })
            
        }
    )
)



function displayData(data){
    let meanings = data[0].meanings;
    let source = data[0].sourceUrls;
    console.log(data);
    var parentResultDiv=$("<div>").appendTo(".result-section");
    var resultDiv = $("<div>").addClass('result-div').appendTo(parentResultDiv);
    let wordTitle = $("<div>").addClass("word-title").appendTo(resultDiv);
    $("<h2>").text(data[0].word).appendTo(wordTitle);

    $("<h4>").text(data[0].phonetic).appendTo(wordTitle);

    $.each(meanings, function(index, meaning){
        var differentMeaningDiv = $("<div>").addClass("differentMeaning").appendTo(".result-div");
        var partOfSpeech = $("<h4>").text(meaning.partOfSpeech).appendTo(differentMeaningDiv);
        var meaningList = $("<ul>").appendTo(differentMeaningDiv);
        console.log(meaning.definitions)
        
        $.each(meaning.definitions, function(i, item){
            var listItem = $("<li>").appendTo(meaningList);
            console.log(item.definition);
            $("<p>").text(item.definition).appendTo(listItem);
        })
    })

    var sourceDiv=$("<h5>").text("Source : ").appendTo(resultDiv);
    $("<a>").attr("href", source).text(source).appendTo(sourceDiv);


}