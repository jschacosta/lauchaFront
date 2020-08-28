export default {
    namespaced:true,
    name:'elections',
    state:{
        categories:{
            seleccion:{
                fifa:{
                    mundialAdult:[{ subitems: []}],
                    olimpJuv:[{ subitems: []}],
                    mundialSub20:[{ subitems: []}],
                    mundialSub17:[{ subitems: []}]
                },
                uefa:{
                    eurocopa:[],
                    ligaNacUefa:[],
                    europeSub21:[],
                    europeSub19:[],
                    europeSub17:[],
                },
                conmebol:{
                    copaAmerica:[],
                    clasificatoria:[],
                    preolimpSub23:[],
                    sudamSub20:[],
                    sudamSub17:[],
                    sudamSub15:[], 
                },
                concacaf:{
                    copaOro:[],
                    clasificatoria:[],
                    ligaNacConcacaf:[],
                    copaConcacaf:[],
                    preolimp:[],
                    campSub20:[],
                    campSub17:[],
                    campSub15:[],
                }
            },
            club:{
                internacional:{
                    fifa:{
                        mundialClubes:[]
                    },
                    uefa:{
                        champions:[],
                        europaleague:[],
                        supercopaUefa:[],
                        conferencia:[]
                    },
                    conmebol:{
                            libert:[],
                            sudam:[],
                            recopaConmebol:[],
                            libertSub20:[]
                    },
                    concacaf:{
                        ligaCamp:[],
                        LigaConcacaf:[] 
                    }
                },
                nacional:{
                    sudamerica:{
                        chile:{
                            liga1Chile:1,
                            liga2Chile:2,
                            copaChile:3,
                            superCopaChile:5
                        },
                        argentina:{
                            liga1Arg:[{ subitems: []}],
                            liga2Arg:[{ subitems: []}],
                            copaArg:[{ subitems: []}],
                            superCopaArg:[{ subitems: []}]
                        }
                    },
                    europa:{
                        espana:{
                            liga1Esp:[{ subitems: []}],
                            liga2Esp:[{ subitems: []}],
                            copaEsp:[{ subitems: []}],
                            superCopaEsp:[{ subitems: []}]
                        },
                        italia:{
                            liga1Ita:[{ subitems: []}],
                            liga2Ita:[{ subitems: []}],
                            copaIta:[{ subitems: []}],
                            superCopaIta:[{ subitems: []}]
                        },
                        francia:{
                            liga1IFran:[{ subitems: []}],
                            liga2Fran:[{ subitems: []}],
                            superCopaFran:[{ subitems: []}]
        
                        },
                        alemania:{
                            liga1Ale:[{ subitems: []}],
                            liga2Ale:[{ subitems: []}],
                            copaAle:[{ subitems: []}],
                            superCopaAle:[{ subitems: []}]
                        },
                        inglaterra:{
                            liga1Ing:[{ subitems: []}],
                            liga2Ing:[{ subitems: []}],
                            copaIng:[{ subitems: []}],
                            facup:[{ subitems: []}],
                            superCopaIng:[{ subitems: []}]
                        }
                    }
                }
            }
        }
    }
}