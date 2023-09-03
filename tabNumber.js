chrome.browserAction.onClicked.addListener(function() {
	console.log("chrome.browserAction.onClicked.");
});

chrome.tabs.onCreated.addListener(function(){
	console.log("chrome.tabs.onCreated.");
	updateTitleNumber()
});

chrome.tabs.onRemoved.addListener(function(){
	console.log("chrome.tabs.onRemoved.");
	updateTitleNumber()
});

function updateTitleNumber() {
	 chrome.tabs.getAllInWindow(null, function(tabs){
	    for (var i = 0; i < 8; i++) {
	    	var tab = tabs[i]
	    	// console.log("tab.url.matchw")
	    	// console.log("tab.url.match" + (tab.url.match("") == null))
	    	
	    	if (tab.url.match("^chrome") == null) {
	    		var title_spliter = ". "

	    		console.log("title: " + tab.title + " url:" + tab.url)
	    		
	    		var originalTitle = tab.title
	    		var oldTitle = tab.title
	    		var tabNumber = i + 1

				var matchedNumbers = tab.title.match("^[0-9]+(?!-\.)")
				if (matchedNumbers != null && matchedNumbers.length > 0) {
		    		var matchedNumber = matchedNumbers[0]
		    		if (matchedNumber != null && !isNaN(matchedNumber)) {
		    			console.log("Matched number: " + matchedNumber)
		    			let oldTabNumber = parseInt(matchedNumber)
						if (oldTabNumber == null || oldTabNumber<0) {
							console.log("Invalidated tab number")
						} else {
							var titlePrefix = matchedNumber + ". "

							originalTitle = tab.title.substring(titlePrefix.length)
							console.log("originalTitle: " + originalTitle)
						}
		    		}
				}

				var newTitle = "document.title = '" + tabNumber + title_spliter + originalTitle + "'"
	    		console.log(newTitle)

	    		chrome.tabs.executeScript(tab.id,{
	    			code: newTitle
	    		});

	    	}
	    	
	    }
	});
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
   console.log("chrome.tabs.onUpdated.addListener title: " + changeInfo.title);
   updateTitleNumber()
});
