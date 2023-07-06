let grilleCases=document.querySelectorAll(".grille_cases");
let contenuGrille=["","","","","","","","",""];
let joueur=1;
let nomJoueur1="joueur 1"
let nomJoueur2="joueur 2"
let symboleJoueur1="X"
let symboleJoueur2="O";
let couleurJoueur1="darkred"
let couleurJoueur2="darkblue"

let gameStart=document.querySelector(".new_game")
let partieTerminee=true
let messageFinDePartie=document.querySelector(".message")
let nombreCasesRemplies=0;

let boutonOption=document.querySelector(".option")
let boiteDialogOption=document.querySelector(".dialog_option");
let dialogOptionConfirmBtn=document.querySelector(".dialog_option_confirmBtn");
let dialogOptionCancelBtn=document.querySelector(".dialog_option_cancelBtn");
let inputNomJoueur1=document.querySelector(".input_nom_joueur1");
let inputNomJoueur2=document.querySelector(".input_nom_joueur2");
let lettreJoueur1=document.querySelector(".lettre_joueur1");
let lettreJoueur2=document.querySelector(".lettre_joueur2");
let couleurJ1=document.querySelector(".couleur_joueur1")
let couleurJ2=document.querySelector(".couleur_joueur2")

messageFinDePartie.textContent="Cliquez sur le bouton Nouveau jeu pour commencer"

/**
 * fonction qui va remplir la case et le tableau de resume de la grille avec
 * un carartere correspondant a celui du joueur 1 ou du joueur 2
 * @param {HTMLElement} element case à remplir
 * @param {number} index index de la case qui va etre remplie
 * @param {string} figure caractere utilisé pour remplir la case
 */
function symboleJoueur(element,index,figure) {
    element.textContent=figure;
    if(joueur===1){
        element.style.color=couleurJoueur1
    }else if(joueur===2){
        element.style.color=couleurJoueur2
    }
    contenuGrille[index]=figure;
}

/**
 * rempli une case avec le caractere du joueur 1 ou du joueur 2 et incremente
 * le nombre de cases remplies.
 */
grilleCases.forEach((element,index) => {
    element.addEventListener("click",()=>{
        if(!partieTerminee){
            if(joueur===1&&contenuGrille[index]===""){
                symboleJoueur(element,index,symboleJoueur1)
                joueur=2
                nombreCasesRemplies++
            }else if(joueur===2&&contenuGrille[index]===""){
                symboleJoueur(element,index,symboleJoueur2);
                joueur=1;
                nombreCasesRemplies++
            }
            controlCombinaison()
        }
    })
});

/**
 * fonction qui remplie le tableau de resume de la grille avec
 * un carartere différent de vide pour empecher que la partie ne
 * continue
 * @param {string} value 
 */
function remplirGrille(value) {
    for (let index in contenuGrille) {
        contenuGrille[index]=value
    }
    partieTerminee=true;
}

/**
 * fonction utilisee pour vider la grille de jeu afin de commencer une nouvelle partie
 */
function nouvelleGrille() {
    grilleCases.forEach(element => {
        element.textContent=""
    });
}

/**
 * permet de réinitialiser tout le jeu
 */
gameStart.addEventListener("click",()=>{
    if(partieTerminee){
        remplirGrille("");
        nouvelleGrille();
        joueur=1;
        messageFinDePartie.textContent=""
        partieTerminee=false
        nombreCasesRemplies=0
    }
})

/**
 * fonction utilisee pour controler les differentes combinaisons de victoire
 * en fonction du remplissage du tableau de resume de la grille et rempli 
 * le message de fin de partie
 */
function controlCombinaison() {
    for (let loop = 0; loop < 3; loop++) {
    //controle horizontal
        if(contenuGrille[0+(3*loop)]===contenuGrille[1+(3*loop)]){
            if(contenuGrille[1+(3*loop)]===contenuGrille[2+(3*loop)]){
                if(contenuGrille[0+(3*loop)]!==""){
                    if(contenuGrille[0+(3*loop)]===symboleJoueur1){
                        messageFinDePartie.textContent=nomJoueur1 + " a battu "+nomJoueur2
                        remplirGrille("fini")
                    }else if(contenuGrille[0+(3*loop)]===symboleJoueur2){
                        messageFinDePartie.textContent=nomJoueur2 + " a battu "+nomJoueur1
                        remplirGrille("fini")
                    }
                }
            }
        }

    //controle vertical
        if(contenuGrille[0+loop]===contenuGrille[3+loop]){
            if(contenuGrille[3+loop]===contenuGrille[6+loop]){
                if(contenuGrille[0+loop]!==""){
                    if(contenuGrille[0+loop]===symboleJoueur1){
                        messageFinDePartie.textContent=nomJoueur1 + " a battu "+nomJoueur2
                        remplirGrille("fini")
                    }else if(contenuGrille[0+loop]===symboleJoueur2){
                        messageFinDePartie.textContent=nomJoueur2 + " a battu "+nomJoueur1
                        remplirGrille("fini")
                    }
                }
            }
        }
    }
    //controle diagonales
    for (let loop = 0; loop < 2; loop++) {
        if(contenuGrille[0+loop*2]===contenuGrille[4]){
            if(contenuGrille[4]===contenuGrille[8-loop*2]){
                if(contenuGrille[0+loop*2]!==""){
                    if(contenuGrille[0+loop*2]===symboleJoueur1&&contenuGrille[4]===symboleJoueur1){
                        messageFinDePartie.textContent=nomJoueur1 + " a battu "+nomJoueur2
                        remplirGrille("fini")
                    }else if(contenuGrille[0+loop*2]===symboleJoueur2&&contenuGrille[4]===symboleJoueur2){
                        messageFinDePartie.textContent=nomJoueur2 + " a battu "+nomJoueur1
                        remplirGrille("fini")
                    }
                }
            }
        }
    }
    //si toutes les cases sont pleines et pas de combinaison de victoire
    if(nombreCasesRemplies===9&&!partieTerminee){
        messageFinDePartie.textContent="Partie terminée"
        remplirGrille("fini")

    }
}


function changerParametres() {
    nomJoueur1=inputNomJoueur1.value;
    nomJoueur2=inputNomJoueur2.value;
    symboleJoueur1=lettreJoueur1.value.toUpperCase();
    symboleJoueur2=lettreJoueur2.value.toUpperCase();
    couleurJoueur1=couleurJ1.value;
    couleurJoueur2=couleurJ2.value;
}
boutonOption.addEventListener("click",()=>{
    boiteDialogOption.show()
})

boiteDialogOption.addEventListener("keypress",(e)=>{
    console.log(e.key)
    if (e.key==="Enter"){
        changerParametres()
        boiteDialogOption.close()
    }
})

dialogOptionConfirmBtn.addEventListener("click",()=>{
    changerParametres()
    boiteDialogOption.close()
})
dialogOptionCancelBtn.addEventListener("click",()=>{

    boiteDialogOption.close()
})










