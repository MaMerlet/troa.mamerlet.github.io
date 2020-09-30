

class Punk{
    constructor(){
        this.beerData = [];
        this.page = document.getElementById('beer-directory');
        this.title = document.getElementById('beer-title');
        this.titleBig = document.getElementById('beer-title-big');
        this.tagline = document.getElementById('tagline');
		        this.description = document.getElementById('beer-description');
				
        this.first_brewed = document.getElementById('m-first-brewed');
        this.ibu = document.getElementById('m-ibu');
        this.ebc = document.getElementById('m-ebc');
        this.srm = document.getElementById('m-srm');
        this.abv = document.getElementById('m-abv');

        this.ingredients = document.getElementById('m-malt');
        this.yeast = document.getElementById('m-yeast');
        this.image_url = document.getElementById('beer-image-disc');

        this.init();
    }
    async init() {
        await this.getAPIData();
    }
    async getAPIData() {
        await fetch('https://api.punkapi.com/v2/beers?page=2&per_page=60')
        .then(response => {
            return response.json();
        })
        .then(data => {
            let obj = (data);
           // console.log(obj);
            this.createBeers(obj); // Create Punk components
        })
        .catch(err => {
            //console.log(err);
        });
    }
    createBeers(beers){
        beers.map((beer, index) => {
            this.beerData = [...this.beerData, beer];
            this.createCards(beer);
        });
    }
	
    createCards(beer){
        let card = document.createElement('div');
        card.innerHTML = '<div class="beer-wrap"><div class="beer-name"><h2>' + beer.name + '</h2></div><div class="beer-tag-line">' + beer.tagline + '</div><button onclick="openModule()">SEE MORE</button></div><img class="beer-image" src="' + beer.image_url + '">';
        card.className = "beer-card";
        card.id = beer.id;
        this.page.appendChild(card);
        document.getElementById(beer.id).addEventListener( "click", ()=> this.updateInformation(beer));
    }
    updateInformation(beer){
        console.log("click");
		this.title.innerHTML = beer.name;
		this.titleBig.innerHTML = beer.name;
		this.tagline.innerHTML = beer.tagline;
        this.description.innerHTML = beer.description;
  
       
        this.first_brewed.innerHTML = beer.first_brewed;
        this.abv.innerHTML = beer.abv;
        this.ibu.innerHTML = beer.ibu;
        this.ebc.innerHTML = beer.ebc;
        this.srm.innerHTML = beer.srm;
		let i, x = "";
for (i in beer.ingredients.malt) {
  x += "<li>" + beer.ingredients.malt[i].name + "</li>"; 
}
this.ingredients.innerHTML = x;
this.yeast.innerHTML = beer.ingredients.yeast;


        this.image_url.innerHTML = '<img src="' + beer.image_url + '">';
    }
	
}

let beer = new Punk();

function openModule() {
document.getElementById("beer-module").style.display = "block";
}

function closeModule() {
document.getElementById("beer-module").style.display = "none";
}

	

