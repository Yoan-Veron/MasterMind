let etape;
let couleur = 0;
const L = ["red","lightgreen","blue","orange"];
const S = [2,3,5,7];
const dico = new Map();
dico.set("Red", "2");
dico.set("LightGreen", "3");
dico.set("Orange", "7");
dico.set("Blue", "5");
dico_inv = [0,0,"Red","LightGreen",0,"Blue",0,"Orange"];

window.fn = {};

window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content.load(page)
    .then(menu.close.bind(menu));
};

function getRealContentHeight() {
           bandeau = $(".bandeau")
           var window_height = $(window).height();
           var content_height = window_height - 2*bandeau.outerHeight() ;
           return content_height;
       }
function createsolution(){
  i = 0
  solution = []
  while (i < 4){
    solution.push(S[Math.floor(Math.random() * 4)])
    i = i + 1
  }
  return solution
}
function create_solution_by_name(sol){
  sol_by_name = []
  for (i = 0; i < sol.length; i++)
    sol_by_name.push(dico_inv[sol[i]])
  return sol_by_name
}
function combi2int(solution){
  entier = 1
  i = 0
  while (i < solution.length){
    entier = entier * solution[i]
    i = i + 1
  }
  return entier
}
function essaieconvert(list){
  i = 0
  nlist = []
  while(i < list.length ){
    nlist.push(dico.get(list[i]))
    i = i + 1
  }
  return nlist
}
function verifplaces(essaie,solution){
  i = 0
  bienplace = 0
  while(i < essaie.length){
    if ( (essaie[i] ^ solution[i]) == 0){
      bienplace = bienplace + 1
    }
    i = i + 1
  }
 return bienplace
}
function verifbons(essaie,solution){
  i = 0
  cpt = 0
  while (i < essaie.length){
    if ((solution % essaie[i]) == 0 ){
      solution = Math.trunc(solution / essaie[i])
      cpt = cpt + 1
    }
    i = i + 1
  }
  return cpt
}
function affichesolution(solution){
 list=create_solution_by_name(solution)
 $("[data-place]").each(function(index){
  $(this).css("background-color",list[index])
 })
}

 $(document).on('show', function(e){
   if (e.target.matches('#partie-seul')) {
     solution = createsolution()
     solutionint = combi2int(solution)
     etape = 0
     nbcolonne = 4
     nbligne = parseInt(prompt("Entrez le nombre d'essais que vous voulez entre 6 et 10"));
     if(nbligne < 6 || nbligne > 10 || isNaN(nbligne)){
       nbligne = 6
     }
     h = (getRealContentHeight()-$("#mind").outerHeight())/2
     $("#solution").css("height",h/nbligne+20)
     hauteurrond= h/nbligne 
     i= 0
     for (cpt = 0; cpt < (nbcolonne*nbligne); cpt++) {
       if ((cpt % nbcolonne) == 0 ){
         a = -(nbcolonne - 1)
       }

       n = (nbcolonne*nbligne) - cpt - 1
       n = n + a
       a = a + 2

        $("#mind").append("<div class='rond' data-num="+ n +"></div>");

}

      for (cpt= 0; cpt < nbligne; cpt ++){
        $("#mind").append("<div class='test' data-num="+ cpt +"><table  width="+hauteurrond+"px height="+hauteurrond+"px ><tr><td></td><td></td></tr> <tr><td></td><td></td></tr> </table></div>");
      }


     $("#mind .rond").each(function(index){
         $(this).css("left",(index % nbcolonne)*(hauteurrond + 20)+10).css("top",parseInt(index / nbcolonne)*(hauteurrond + 20)+10 ).css("width",hauteurrond).css("height",hauteurrond);
       })

       $("#mind .test").each(function(index){
         haut = $("#mind .rond").eq(index*nbcolonne).css("top")
           $(this).css("left", nbcolonne*(hauteurrond + 20) + 10).css("top",haut).css("width",hauteurrond).css("height",hauteurrond);
         })

     for (cpt = 0; cpt < nbcolonne; cpt++) {
     $("#solution").append("<div class='rond'data-place="+cpt+"></div>");
   }
     $("#solution .rond").each(function(index){
         $(this).css("left",(index % nbcolonne)*(hauteurrond + 20) + 10).css("top",parseInt(index / nbcolonne)*(hauteurrond + 20) + 10).css("width",hauteurrond).css("height",hauteurrond);
       })

    $(".rond").click(function(){
      if ((Math.trunc($(this).data("num")/nbcolonne)) == (etape)){
      $(this).css("background-color",L[couleur])
      couleur = (couleur + 1) % L.length
    }
    })
    $("#ok").click(function(){
      let i = 0
      list = []
      while(i < 4){
        numcase = 4*etape+i
        lacase = $("[data-num="+numcase+"]")
        lacouleur = w3color(lacase.css("background-color"))
        nom = lacouleur.toName()
        list.push(nom)
        i = i + 1
      }

      essaie = essaieconvert(list)
      bons = verifbons(essaie,solutionint)
      places = verifplaces(essaie,solution)
      malplaces = bons-places
      if (malplaces < 0){
        malplaces = -malplaces
      }

      cpt = 0
      while(cpt < places){
        $("#mind .test > table").eq(nbligne-1-1*etape).find("td").eq(cpt).css("background-color","green")
        cpt++
      }
      j = 0
      while(j < malplaces){
        $("#mind .test > table").eq(nbligne-1-1*etape).find("td").eq(cpt+j).css("background-color","yellow")
        j++
      }

      if (places == 4){
        $(ons.notification.toast("Vous avez gagn&eacte;", { timeout: 2000, animation: 'fall' }))
        affichesolution(solution)
      }
      else {
        etape = etape + 1
        if(etape == nbligne){
          $(ons.notification.toast("Vous avez perdu", { timeout: 2000, animation: 'fall' }))
          affichesolution(solution)
        }
      }
    })
   }
   })

ons.ready(function(){

});
