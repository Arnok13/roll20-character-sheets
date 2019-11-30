        // Version handling and translation text loading 
        on("sheet:opened", function() {
            getAttrs(["sheetVersion", "atkcible"], function(values) {
                var update = {};
                // Translation text for rolls 
                update["text_agilite"] = getTranslationByKey("agilite");
                update["text_ame"] = getTranslationByKey("ame");
                update["text_blessures"] = getTranslationByKey("blessures");
                update["text_bonus"] = getTranslationByKey("bonus");
                update["text_combat"] = getTranslationByKey("combat");
                update["text_conduite"] = getTranslationByKey("conduite");
                update["text_difficulte"] = getTranslationByKey("difficulte");
                update["text_discretion"] = getTranslationByKey("discretion");
                update["text_encombrement"] = getTranslationByKey("encombrement");
                update["text_equitation"] = getTranslationByKey("equitation");
                update["text_fatigue"] = getTranslationByKey("fatigue");
                update["text_force"] = getTranslationByKey("force");
                update["text_intimidation"] = getTranslationByKey("intimidation");
                update["text_intellect"] = getTranslationByKey("intellect");
                update["text_intimidation"] = getTranslationByKey("intimidation");
                update["text_jet-de"] = getTranslationByKey("jet-de");
                update["text_jeu"] = getTranslationByKey("jeu");
                update["text_joker"] = getTranslationByKey("joker");
                update["text_lancer"] = getTranslationByKey("lancer");
                update["text_modificateur"] = getTranslationByKey("modificateur");
                update["text_navigation"] = getTranslationByKey("navigation");
                update["text_nonentraine"] = getTranslationByKey("nonentraine");
                update["text_perception"] = getTranslationByKey("perception");
                update["text_persuasion"] = getTranslationByKey("persuasion");
                update["text_pilotage"] = getTranslationByKey("pilotage");
                update["text_recherche"] = getTranslationByKey("recherche");
                update["text_reparation"] = getTranslationByKey("reparation");
                update["text_sarcasme"] = getTranslationByKey("sarcasme");
                update["text_soins"] = getTranslationByKey("soins");
                update["text_survie"] = getTranslationByKey("survie");
                update["text_tir"] = getTranslationByKey("tir");
                update["text_tripes"] = getTranslationByKey("tripes");
                update["text_vigueur"] = getTranslationByKey("vigueur");
                update["text_attaque-avec"] = getTranslationByKey("attaque-avec");
                update["text_degats"] = getTranslationByKey("degats");
                update["text_degats-relance"] = getTranslationByKey("degats-relance");
                update["text_weap-dmg"] = getTranslationByKey("weap-dmg");
                update["text_resistance"] = getTranslationByKey("resistance");
                update["text_damage-mod"] = getTranslationByKey("damage-mod");
                update["text_dejoker"] = getTranslationByKey("dejoker");
                update["text_yes"] = getTranslationByKey("yes");
                update["text_no"] = getTranslationByKey("no");
                update["text_portee"] = getTranslationByKey("portée");
                update["text_courte"] = getTranslationByKey("courte");
                update["text_moyenne"] = getTranslationByKey("moyenne");
                update["text_longue"] = getTranslationByKey("longue");
                update["text_athletics"] = getTranslationByKey("athletics");
                update["text_commonknowledge"] = getTranslationByKey("commonknowledge");
                update["text_performance"] = getTranslationByKey("performance");
                update["text_battle"] = getTranslationByKey("battle");
                update["text_thieverie"] = getTranslationByKey("thieverie");
                update["text_electronics"] = getTranslationByKey("electronics");
                update["text_science"] = getTranslationByKey("science");
                update["text_weirdscience"] = getTranslationByKey("weirdscience");
                update["text_academics"] = getTranslationByKey("academics");
                update["text_focus"] = getTranslationByKey("focus");
                update["text_faith"] = getTranslationByKey("faith");
                update["text_hacking"] = getTranslationByKey("hacking");
                update["text_occult"] = getTranslationByKey("occult");
                update["text_psionics"] = getTranslationByKey("psionics");
                update["text_spellcasting"] = getTranslationByKey("spellcasting");
                update["text_course"] = getTranslationByKey("course");
                update["text_distracted"] = getTranslationByKey("distracted-u");
                update["text_crystal"] = getTranslationByKey("comp_crystal");
                update["text_ingeneering"] = getTranslationByKey("ingeneering");
                // Version
                var vers = parseFloat(values.sheetVersion) || 0;
                if (vers < 3.0) {
                    // Gestion du type de personnage 
                    getAttrs(["pnjtype", "extra", "pnj"], function(values) {
                        var pnjtyp = parseInt(values.pnjtype) || 0;
                        var pnjval = ((parseInt(values.extra) ||
                            0) * 3) + (parseInt(values.pnj) || 0);
                        if ((pnjtyp == 0) && (pnjval > 0)) { update["pnjtype"] = pnjval; }
                        update["sheetVersion"] = 3.0;
                    });
                }
                if (vers <
                    3.2) {
                    if ((parseInt(values.atkcible) || 0) == 1) {
                        update["cibleparade"] = "@{target|parade}";
                        update["cibleresistance"] = "@{target|resistance}";
                        update[
                            "ciblearcane"] = "?{" + getTranslationByKey("difficulte") + "|4}";
                        update["atknom"] = "@{target|character_name}";
                    } else {
                        update["cibleparade"] = "?{" + getTranslationByKey("parade") + "|4}";
                        update["cibleresistance"] = "?{" + getTranslationByKey(
                            "resistance") + "|4}";
                        update["ciblearcane"] = "?{" + getTranslationByKey("difficulte") + "|4}";
                        update["atknom"] = "-";
                    }
                    update["sheetVersion"] = 3;
                }
                setAttrs(update);
            });
        }); //===J OKER / PNJ / EXTRA 
        on("change:pnjtype", function(eventinfo) {
            var pjtype = parseInt(eventinfo.newValue) || 0;
            var ispnj = 1;
            var isextra = 0;
            var possessions = 1;
            var disposs = 1;
            var tpletat = 1;
            var joker = "1d6";
            var nbbless = 3;
            var logo = 1;
            var lib = "";
            switch (pjtype) {
                case 0:
                    ispnj = 0;
                    isextra = 0;
                    possessions = 1;
                    disposs = 1;
                    tpletat = 1;
                    joker = "1d6";
                    nbbless = 3;
                    logo = 1;
                    lib = getTranslationByKey("personnage");
                    break;
                case 1: //PNJ Joker 
                    ispnj = 1;
                    isextra = 0;
                    possessions = 1;
                    disposs = 0;
                    tpletat = 0;
                    joker = "1d6";
                    nbbless = 3;
                    logo = 0;
                    lib = getTranslationByKey("joker-pnj");
                    break;
                case 2: //Sous-fifre 
                    ispnj = 1;
                    isextra = 0;
                    possessions = 1;
                    disposs = 0;
                    tpletat = 0;
                    joker = "0d4";
                    nbbless = 3;
                    logo = 0;
                    lib = getTranslationByKey("sous-fifre-pnj");
                    break;
                case 3: //Bras droit 
                    ispnj = 1;
                    isextra = 0;
                    possessions = 1;
                    disposs = 0;
                    tpletat = 0;
                    joker = "1d6";
                    nbbless = 0;
                    logo = 0;
                    lib = getTranslationByKey("bras-droit-pnj");
                    break;
                case 4: //Extra 
                    ispnj = 1;
                    isextra = 1;
                    possessions = 0;
                    disposs = 0;
                    tpletat = 0;
                    joker = "0d4";
                    nbbless = 0;
                    logo = 0;
                    lib = getTranslationByKey("extra-pnj-short");
                    break;
                default: //Personnalisé 
                    ispnj = 1;
                    isextra = 0;
                    possessions = 1;
                    disposs = 0;
                    tpletat = 0;
                    joker = "1d6";
                    nbbless = 3;
                    logo = 0;
                    lib = getTranslationByKey("pnj-custom");
            }
            setAttrs({
                "pnj": ispnj,
                "extra": isextra,
                "chkPossessions": possessions,
                "dispPossessions": disposs,
                "templateetat": tpletat,
                "joker_de": joker,
                "confBlessures": nbbless,
                "sheetLogo": logo,
                "pnjtypelib": lib
            });
        });
        //===BLESSURES et Malus blessure 
        on("change:confBlessures", function(eventinfo) {
            var conf = parseInt(eventinfo.newValue) || 0;
            setAttrs({ bless1: parseInt(+(conf > 0)) || 0, bless2: parseInt(+(conf > 1)) || 0, bless3: parseInt(+(conf > 2)) || 0 });
        });
        on("change:confFatigue", function(eventinfo) {
            var conf = parseInt(eventinfo.newValue) || 0;
            setAttrs({ fatigue3: parseInt(+(conf > 0)) || 0 });
        });
        on("change:blessures", function(eventinfo) {
            var malusblessures = 0;
            if (eventinfo.newValue > 3) { malusblessures = 3; } else {
                malusblessures = eventinfo.newValue;
            }
            setAttrs({ malusblessures: malusblessures });
        });
        // === FATIGUE et Malus blessure 
        on("change:fatigue", function(eventinfo) {
            var malusfatigue = 0;
            if (eventinfo.newValue > 3) { malusfatigue = 3; } else {
                malusfatigue = eventinfo.newValue;
            }
            setAttrs({ malusfatigue: malusfatigue });
        });
        // === Distracted
        on("change:distracted", function(eventinfo) {
            var malusDistracted = 0;
            if (eventinfo.newValue == 1) {
                malusDistracted = 2;
            }
            setAttrs({ malusDistracted: malusDistracted });
        });
        // === Entangled
        on("change:entangled", function(eventinfo) {
            if (eventinfo.newValue == 1) {
                    setAttrs({distracted:1});
            } 
        });
        // === Bound
        on("change:bound", function(eventinfo) {
            if (eventinfo.newValue == 1) {
                    setAttrs({distracted:1, vulnerable:1});
            } 
        });
        // === Stunned
        on("change:sonne", function(eventinfo) {
            if (eventinfo.newValue == 1) {
                setAttrs({distracted:1});
            } else {
                setAttrs({distracted:1, vulnerable:1});
            }
        });
        // === ARMES FIXES 
        on("change:arme1_comp", function(eventinfo) {
            setAttrs({
                arme1_comp_rel: "@{relRollBast" + eventinfo.newValue + "}",
                arme1_comp_jet: "@{jetRollBast" + eventinfo.newValue + "}",
                arme1_comp_brut: "@{RollBast" + eventinfo.newValue + "}"
            });
        });
        on("change:arme2_comp", function(eventinfo) {
            setAttrs({
                arme2_comp_rel: "@{relRollBast" + eventinfo.newValue + "}",
                arme2_comp_jet: "@{jetRollBast" + eventinfo.newValue + "}",
                arme2_comp_brut: "@{RollBast" + eventinfo.newValue + "}"
            });
        });
        on("change:arme3_comp", function(eventinfo) {
            setAttrs({
                arme3_comp_rel: "@{relRollBast" + eventinfo.newValue + "}",
                arme3_comp_jet: "@{jetRollBast" + eventinfo.newValue + "}",
                arme3_comp_brut: "@{RollBast" + eventinfo.newValue + "}"
            });
        });
        // === ARMES DYNAMIQUES 
        on("change:repeating_armes:armed_comp", function(eventinfo) {
            setAttrs({
                repeating_armes_armeD_comp_rel: "@{relRollBast" + eventinfo.newValue + "}",
                repeating_armes_armeD_comp_jet: "@{jetRollBast" + eventinfo.newValue + "}",
                repeating_armes_armeD_comp_brut: "@{RollBast" + eventinfo.newValue + "}"
            });
        });
        // === CARACS DÉRIVÉES 
        // Parade 
        on("change:combat_de change:combat_bonus change: parade_bonus ", function() {
            getAttrs(["combat_de ", "combat_bonus ", "parade_bonus "], function(values) {
                setAttrs({
                    parade_base: 2 + Math.floor((parseInt(values.combat_de) + parseInt(values.combat_bonus)) / 2),
                    parade: parseInt(values.parade_bonus) +
                        2 + Math.floor((parseInt(values.combat_de) + parseInt(values.combat_bonus)) / 2)
                });
            });
        });
        // Résistance 
        on("change:vigueur_de change:vigueur_bonus change:resistance_bonus", function() {
            getAttrs(["vigueur_de", "vigueur_bonus", "resistance_bonus"],
                function(values) {
                    setAttrs({
                        resistance_base: 2 + Math.floor((parseInt(values.vigueur_de) + parseInt(values.vigueur_bonus)) / 2),
                        resistance: parseInt(values.resistance_bonus) + 2 + Math.floor((parseInt(values.vigueur_de) + parseInt(values.vigueur_bonus)) / 2)
                    });
                });
        });
        // Affichage / Masquage toutes compétences 
        on("change:chkAllComp", function(eventinfo) {
            setAttrs({
                chkCombat: eventinfo.newValue,
                chkConduite: eventinfo.newValue,
                chkEquitation: eventinfo.newValue,
                chkIntimidation: eventinfo.newValue,
                chkJeu: eventinfo.newValue,
                chkLanguage : eventinfo.newValue,
                chkNavigation: eventinfo.newValue,
                chkPilotage: eventinfo.newValue,
                chkRecherche: eventinfo.newValue,
                chkReparation: eventinfo.newValue,
                chkSarcasme: eventinfo.newValue,
                chkSoins: eventinfo.newValue,
                chkSurvie: eventinfo.newValue,
                chkTir: eventinfo.newValue,
                chkPerformance: eventinfo.newValue,
                chkBattle: eventinfo.newValue,
                chkThieverie: eventinfo.newValue,
                chkElectronics: eventinfo.newValue,
                chkFocus: eventinfo.newValue,
                chkFaith: eventinfo.newValue,
                chkHacking: eventinfo.newValue,
                chkOccult: eventinfo.newValue,
                chkPsionics: eventinfo.newValue,
                chkScience: eventinfo.newValue,
                chkWeirdScience: eventinfo.newValue,
                chkSpellcasting: eventinfo.newValue,
                chkAcademics: eventinfo.newValue
            });
        });
        // === Inventaire et encombrement 
        on("change:force_de change:force_bonus", function() {
            getAttrs(["force_de", "force_bonus"],
                function(values) {
                    var newForce = parseInt(values.force_de) || 4;
                    var bonusValue = parseInt(values.force_bonus) || 0;
                    var uncombranceValue = 0;
                    switch (newForce) {
                        case 4:
                            uncombranceValue = 10;
                            break;
                        case 6:
                            uncombranceValue = 20;
                            break;
                        case 8:
                            uncombranceValue = 30;
                            break;
                        case 10:
                            uncombranceValue = 40;
                            break;
                        case 12:
                            uncombranceValue = 50;
                            break;
                        default:
                            uncombranceValue = 0;
                    };
                    setAttrs({ encombmax: uncombranceValue + (bonusValue * 10) });
                });
        });
        on("change:repeating_equipements:equipqte change:repeating_equipements:equippdsunit",
            function() {
                getAttrs(["repeating_equipements_equipqte", "repeating_equipements_equippdsunit"], function(values) {
                    var qte = parseFloat(values.repeating_equipements_equipqte) || 1.0;
                    var pds = parseFloat(values.repeating_equipements_equippdsunit) || 0.0;
                    setAttrs({ repeating_equipements_equippoids: qte * pds });
                });
            });
        on("remove:repeating_equipements change:repeating_equipements:equippoids", function() {
            getSectionIDs("repeating_equipements", function(idws) {
                var totwght = 0.0;
                idws.forEach(function(idw, index, arr) {
                    var uwght = "repeating_equipements_" + idw + "_equippoids";
                    var lng = parseInt(arr.length) || 0;
                    getAttrs([uwght], function(val) {
                        totwght = totwght + parseFloat(val[uwght]) || 0.0;
                        if ((index +
                                1) == lng) { setAttrs({ encombpoids: totwght }); }
                    });
                });
            });
        });
        on("change:encombpoids change:encombmax", function() {
            getAttrs(["encombmax", "encombpoids"], function(values) {
                var lemax = parseInt(values.encombmax) || 1;
                var lepoids = parseInt(values.encombpoids) || 0;
                var malus = 0;
                if (lepoids > lemax) {
                    malus = 2;
                };
                setAttrs({ encombrement: malus });
            });
        });
        // === Attaques 
        on("change:atkcible", function(eventinfo) {
            var cibleparade = "",
                cibleresistance = "",
                ciblearcane = "",
                atknom = "";
            if (eventinfo.newValue == 1) {
                cibleparade = "@{target|parade}";
                cibleresistance = "@{target|resistance}";
                ciblearcane = "?{" + getTranslationByKey("difficulte") + "|4}";
                atknom = "@{target|character_name}";
            } else {
                cibleparade = "?{" +
                    getTranslationByKey("parade") + "|4}";
                cibleresistance = "?{" + getTranslationByKey("resistance") + "|4}";
                ciblearcane = "?{" + getTranslationByKey("difficulte") + "|4}";
                atknom = "-";
            }
            setAttrs({
                cibleparade: cibleparade,
                cibleresistance: cibleresistance,
                ciblearcane: ciblearcane,
                atknom: atknom
            });
        });