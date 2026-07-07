export const contaminants = [
  {
    name:"Benzene", cas:"71-43-2", formula:"C6H6", iarc:"Group 1 Carcinogen", genotoxic:true,
    props:[["Melting point","5.5 C"],["Boiling point","80.1 C"],["Solubility (water)","1.79 g/L"],["Flash point","-11 F"],["Oral LD50 (rat)","930 mg/kg"],["OSHA PEL","1 ppm TWA"]],
    mutations:[["Mus musculus","Tp53 / chr11","G to T transversion hotspot"],["Homo sapiens","BRCA2 / chr13","Chromosome breakage"],["Danio rerio","Sox2 / chr2","Developmental malformation"]],
    links:["PubChem 241","TOXNET 71432","UniProt P04637","GenBank"]
  },
  {
    name:"Cadmium", cas:"7440-43-9", formula:"Cd", iarc:"Group 1 Carcinogen", genotoxic:true,
    props:[["Melting point","321 C"],["Boiling point","767 C"],["Density","8.65 g/cm3"],["Oral LD50 (rat)","225 mg/kg"],["Half-life (renal)","10 to 30 yr"],["WHO water limit","0.003 mg/L"]],
    mutations:[["Homo sapiens","GCN4 / chr16","DNA repair suppression"],["Rattus norvegicus","MT1A / chr19","Metallothionein induction"],["Oryza sativa","OsHMA3","Root uptake dysregulation"]],
    links:["PubChem 23973","TOXNET 7440439","UniProt P02795"]
  },
  {
    name:"Lead", cas:"7439-92-1", formula:"Pb", iarc:"Group 2A Probable", genotoxic:true,
    props:[["Melting point","327.5 C"],["Boiling point","1749 C"],["Density","11.34 g/cm3"],["Blood ref level","3.5 ug/dL"],["WHO water limit","0.01 mg/L"]],
    mutations:[["Homo sapiens","ALAD / chr9","Enzyme inhibition, heme synthesis"],["Homo sapiens","VDR / chr12","Calcium pathway disruption"]],
    links:["PubChem 5352425","TOXNET 7439921"]
  },
  {
    name:"Mercury", cas:"7439-97-6", formula:"Hg", iarc:"Group 3", genotoxic:true,
    props:[["Melting point","-38.8 C"],["Boiling point","356.7 C"],["Density","13.53 g/cm3"],["WHO water limit","0.006 mg/L"],["Half-life (blood)","44 to 80 d"]],
    mutations:[["Homo sapiens","SEPP1 / chr5","Selenoprotein disruption"],["Danio rerio","gfap","Neurodevelopmental injury"]],
    links:["PubChem 23931","TOXNET 7439976"]
  },
  {
    name:"Arsenic", cas:"7440-38-2", formula:"As", iarc:"Group 1 Carcinogen", genotoxic:true,
    props:[["Melting point","817 C"],["Density","5.73 g/cm3"],["Oral LD50 (rat)","763 mg/kg"],["WHO water limit","0.01 mg/L"],["Half-life","10 h to 4 d"]],
    mutations:[["Homo sapiens","TP53 / chr17","Base substitution accumulation"],["Homo sapiens","KRAS / chr12","Signaling activation"]],
    links:["PubChem 5359596","TOXNET 7440382"]
  },
  {
    name:"Chromium VI", cas:"18540-29-9", formula:"CrO4(2-)", iarc:"Group 1 Carcinogen", genotoxic:true,
    props:[["Solubility","High (water)"],["Oral LD50 (rat)","50 to 100 mg/kg"],["WHO water limit","0.05 mg/L"],["OSHA PEL","0.005 mg/m3"]],
    mutations:[["Homo sapiens","p53 / chr17","DNA-protein crosslinks"],["Mus musculus","Ogg1","Oxidative lesion repair failure"]],
    links:["PubChem 24425","TOXNET 18540299"]
  },
  {
    name:"Toluene", cas:"108-88-3", formula:"C7H8", iarc:"Group 3", genotoxic:false,
    props:[["Melting point","-95 C"],["Boiling point","110.6 C"],["Solubility","0.52 g/L"],["Flash point","4.4 C"],["OSHA PEL","200 ppm"]],
    mutations:[["Homo sapiens","CYP2E1","Metabolic activation variance"]],
    links:["PubChem 1140","TOXNET 108883"]
  },
  {
    name:"Polychlorinated biphenyls", cas:"1336-36-3", formula:"C12H(10-n)Cl(n)", iarc:"Group 1 Carcinogen", genotoxic:true,
    props:[["State","Oily liquid to resin"],["Solubility","Very low"],["Half-life (soil)","Years to decades"],["Bioaccumulation","High"]],
    mutations:[["Homo sapiens","AHR / chr7","Receptor-mediated toxicity"],["Homo sapiens","CYP1A1","Enzyme overexpression"]],
    links:["PubChem 36098","TOXNET 1336363"]
  },
  {
    name:"Benzo[a]pyrene", cas:"50-32-8", formula:"C20H12", iarc:"Group 1 Carcinogen", genotoxic:true,
    props:[["Melting point","179 C"],["Boiling point","495 C"],["Solubility","0.0016 mg/L"],["Class","Polycyclic aromatic hydrocarbon"]],
    mutations:[["Homo sapiens","TP53 codon 157","G to T transversion"],["Mus musculus","Hprt","Point mutation induction"]],
    links:["PubChem 2336","TOXNET 50328"]
  },
  {
    name:"Formaldehyde", cas:"50-00-0", formula:"CH2O", iarc:"Group 1 Carcinogen", genotoxic:true,
    props:[["Boiling point","-19 C"],["Solubility","400 g/L"],["OSHA PEL","0.75 ppm"],["Odor threshold","0.05 ppm"]],
    mutations:[["Homo sapiens","DNA-protein crosslinks","Nasopharyngeal lesion pattern"]],
    links:["PubChem 712","TOXNET 50000"]
  },
  {
    name:"Nitrate", cas:"14797-55-8", formula:"NO3(-)", iarc:"Not classified", genotoxic:false,
    props:[["Solubility","Very high"],["WHO water limit","50 mg/L"],["Source","Fertilizer runoff"]],
    mutations:[["Homo sapiens","Methemoglobin pathway","Infant blue baby syndrome"]],
    links:["PubChem 943"]
  },
  {
    name:"DDT", cas:"50-29-3", formula:"C14H9Cl5", iarc:"Group 2A Probable", genotoxic:true,
    props:[["Melting point","108.5 C"],["Solubility","0.025 mg/L"],["Half-life (soil)","2 to 15 yr"],["Bioaccumulation","Very high"]],
    mutations:[["Homo sapiens","ESR1 / chr6","Endocrine disruption"],["Rattus norvegicus","CYP3A","Hepatic enzyme induction"]],
    links:["PubChem 3036","TOXNET 50293"]
  },
  {
    name:"Trichloroethylene", cas:"79-01-6", formula:"C2HCl3", iarc:"Group 1 Carcinogen", genotoxic:true,
    props:[["Boiling point","87.2 C"],["Solubility","1.28 g/L"],["OSHA PEL","100 ppm"],["Flash point","None (non-flammable)"]],
    mutations:[["Homo sapiens","VHL / chr3","Renal cell carcinoma mutation"],["Mus musculus","Pml","Lymphoma induction"]],
    links:["PubChem 6575","TOXNET 79016"]
  },
  {
    name:"Vinyl chloride", cas:"75-01-4", formula:"C2H3Cl", iarc:"Group 1 Carcinogen", genotoxic:true,
    props:[["Boiling point","-13.4 C"],["Solubility","2.67 g/L"],["OSHA PEL","1 ppm"],["Odor threshold","3000 ppm"]],
    mutations:[["Homo sapiens","TP53 / chr17","A to T transversion at codon 249"],["Homo sapiens","CTNNB1","Angiosarcoma signature"]],
    links:["PubChem 6338","TOXNET 75014"]
  },
  {
    name:"Dioxin (TCDD)", cas:"1746-01-6", formula:"C12H4Cl4O2", iarc:"Group 1 Carcinogen", genotoxic:true,
    props:[["Melting point","303 C"],["Solubility","0.0000193 g/L"],["Half-life (human)","7 to 11 yr"],["Bioaccumulation","Extreme"]],
    mutations:[["Homo sapiens","AHR / chr7","Transcription factor dysregulation"],["Mus musculus","Cyp1b1","Aryl hydrocarbon induction"]],
    links:["PubChem 15625","TOXNET 1746016"]
  },
  {
    name:"Asbestos (chrysotile)", cas:"12001-29-5", formula:"Mg3Si2O5(OH)4", iarc:"Group 1 Carcinogen", genotoxic:true,
    props:[["Form","Fibrous silicate mineral"],["WHO limit (air)","1 fibre/mL"],["Biopersistence","Decades"],["Primary route","Inhalation"]],
    mutations:[["Homo sapiens","CDKN2A / chr9","Mesothelioma signature"],["Homo sapiens","NF2 / chr22","Chromosome deletion"]],
    links:["PubChem 16211241","TOXNET 12001295"]
  },
  {
    name:"PFOA", cas:"335-67-1", formula:"C8HF15O2", iarc:"Group 1 Carcinogen", genotoxic:true,
    props:[["Boiling point","189 to 192 C"],["Solubility","9.5 g/L"],["Half-life (human)","3.5 yr"],["Persistence","Indefinite (forever chemical)"]],
    mutations:[["Homo sapiens","PPARA / chr22","Nuclear receptor dysregulation"],["Homo sapiens","ESR1","Endocrine interference"]],
    links:["PubChem 9554","TOXNET 335671"]
  },
  {
    name:"PFOS", cas:"1763-23-1", formula:"C8HF17O3S", iarc:"Group 2B Possible", genotoxic:true,
    props:[["Melting point",">=40 C"],["Solubility","0.519 g/L"],["Half-life (human)","5.4 yr"],["Persistence","Indefinite (forever chemical)"]],
    mutations:[["Homo sapiens","PPARG","Metabolic pathway interference"],["Rattus norvegicus","Cyp7a1","Bile acid disruption"]],
    links:["PubChem 74483","TOXNET 1763231"]
  },
  {
    name:"Atrazine", cas:"1912-24-9", formula:"C8H14ClN5", iarc:"Group 3", genotoxic:false,
    props:[["Melting point","173 to 175 C"],["Solubility","0.033 g/L"],["WHO water limit","0.002 mg/L"],["Primary use","Herbicide"]],
    mutations:[["Homo sapiens","CYP19A1","Aromatase disruption (endocrine)"],["Xenopus laevis","sf-1","Gonadal feminisation"]],
    links:["PubChem 2256","TOXNET 1912249"]
  },
  {
    name:"Organophosphate (Parathion)", cas:"56-38-2", formula:"C10H14NO5PS", iarc:"Group 1 Carcinogen", genotoxic:true,
    props:[["Boiling point","375 C"],["Solubility","0.024 g/L"],["Oral LD50 (rat)","3 mg/kg"],["Mechanism","Acetylcholinesterase inhibition"]],
    mutations:[["Homo sapiens","ACHE / chr7","Cholinesterase gene suppression"],["Mus musculus","Tp53","Oxidative stress pathway"]],
    links:["PubChem 991","TOXNET 56382"]
  },
  {
    name:"Carbon tetrachloride", cas:"56-23-5", formula:"CCl4", iarc:"Group 2A Probable", genotoxic:true,
    props:[["Boiling point","76.7 C"],["Solubility","0.793 g/L"],["OSHA PEL","2 ppm"],["Flash point","None (non-flammable)"]],
    mutations:[["Homo sapiens","CYP2E1 / chr10","Hepatic free radical generation"],["Rattus norvegicus","Ccl4","Stellate cell activation"]],
    links:["PubChem 5943","TOXNET 56235"]
  },
  {
    name:"Hydrogen sulfide", cas:"7783-06-4", formula:"H2S", iarc:"Not classified", genotoxic:false,
    props:[["Boiling point","-60 C"],["OSHA PEL","20 ppm"],["IDLH","100 ppm"],["Source","Petroleum, sewage, volcanoes"]],
    mutations:[["Homo sapiens","MT-CO1 / mtDNA","Mitochondrial complex IV inhibition"]],
    links:["PubChem 402","TOXNET 7783064"]
  },
  {
    name:"Nickel (soluble compounds)", cas:"7440-02-0", formula:"Ni", iarc:"Group 1 Carcinogen", genotoxic:true,
    props:[["Melting point","1455 C"],["WHO water limit","0.07 mg/L"],["Primary route","Inhalation / ingestion"]],
    mutations:[["Homo sapiens","PTEN / chr10","Epigenetic silencing"],["Homo sapiens","CDH1","Promoter methylation"]],
    links:["PubChem 935","TOXNET 7440020"]
  },
  {
    name:"Chloroform", cas:"67-66-3", formula:"CHCl3", iarc:"Group 2A Probable", genotoxic:true,
    props:[["Boiling point","61.2 C"],["Solubility","8 g/L"],["OSHA PEL","50 ppm"],["Flash point","None (non-flammable)"]],
    mutations:[["Homo sapiens","CYP2E1","Trichloromethanol activation"],["Rattus norvegicus","Tp53","Hepatocellular mutation"]],
    links:["PubChem 6212","TOXNET 67663"]
  },
  {
    name:"Aflatoxin B1", cas:"1162-65-8", formula:"C17H12O6", iarc:"Group 1 Carcinogen", genotoxic:true,
    props:[["Melting point","268 to 269 C"],["Solubility","Low (chloroform soluble)"],["Source","Aspergillus flavus mould on stored grains"],["Primary concern","Sub-Saharan Africa food supply"]],
    mutations:[["Homo sapiens","TP53 codon 249","R249S hotspot mutation"],["Homo sapiens","CYP1A2","Bioactivation to epoxide"]],
    links:["PubChem 186907","TOXNET 1162658"]
  },
  {
    name:"Benzidine", cas:"92-87-5", formula:"C12H12N2", iarc:"Group 1 Carcinogen", genotoxic:true,
    props:[["Melting point","122 C"],["Solubility","0.4 g/L"],["Source","Tannery dye, textile industry"]],
    mutations:[["Homo sapiens","NAT2 / chr8","N-acetyltransferase activation"],["Homo sapiens","HRAS","Bladder carcinoma signature"]],
    links:["PubChem 6758","TOXNET 92875"]
  },
  {
    name:"Crude petroleum (Total)", cas:"8002-05-9", formula:"Complex mixture", iarc:"Group 2B Possible", genotoxic:true,
    props:[["Composition","C5 to C35 hydrocarbons"],["Solubility","Low"],["Primary concern","Niger Delta spills"],["Source","Oil exploration and pipeline leaks"]],
    mutations:[["Homo sapiens","TP53","PAH-driven adduct formation"],["Danio rerio","cyp1a","Cytochrome P450 induction"]],
    links:["PubChem 23628","TOXNET 8002059"]
  },
  {
    name:"Cadmium oxide", cas:"1306-19-0", formula:"CdO", iarc:"Group 1 Carcinogen", genotoxic:true,
    props:[["Melting point","1559 C"],["Solubility","Slightly soluble"],["Primary route","Inhalation (fume)"],["OSHA PEL","0.1 mg/m3"]],
    mutations:[["Homo sapiens","BRCA1 / chr17","DNA repair suppression"],["Homo sapiens","p16","Epigenetic silencing"]],
    links:["PubChem 14800","TOXNET 1306190"]
  },
  {
    name:"Sulfur dioxide", cas:"7446-09-5", formula:"SO2", iarc:"Group 3", genotoxic:false,
    props:[["Boiling point","-10 C"],["WHO air limit","20 ug/m3 (24h)"],["Source","Fossil fuel combustion"],["OSHA PEL","5 ppm"]],
    mutations:[["Homo sapiens","Mucociliary pathway","Airway epithelium damage"]],
    links:["PubChem 1119","TOXNET 7446095"]
  },
  {
    name:"PM2.5 particles", cas:"N/A", formula:"Mixed aerosol", iarc:"Group 1 Carcinogen", genotoxic:true,
    props:[["Particle size","Less than 2.5 um"],["WHO annual limit","5 ug/m3"],["WHO 24h limit","15 ug/m3"],["Primary concern","Lagos roadside and industrial zones"]],
    mutations:[["Homo sapiens","ERCC2 / chr19","Nucleotide excision repair impairment"],["Homo sapiens","OGG1","8-oxoguanine accumulation"]],
    links:["WHO AQG 2021","TOXNET PM25"]
  },
  {
    name:"Tetrachloroethylene", cas:"127-18-4", formula:"C2Cl4", iarc:"Group 2A Probable", genotoxic:true,
    props:[["Boiling point","121.1 C"],["Solubility","0.15 g/L"],["OSHA PEL","100 ppm"],["Source","Dry cleaning solvent"]],
    mutations:[["Homo sapiens","CYP2E1","DCVC nephrotoxic metabolite"],["Homo sapiens","p21","Cell cycle arrest trigger"]],
    links:["PubChem 31373","TOXNET 127184"]
  },
  {
    name:"Hexavalent chromium dust", cas:"7738-94-5", formula:"CrO3", iarc:"Group 1 Carcinogen", genotoxic:true,
    props:[["Melting point","197 C"],["Solubility","Highly soluble"],["OSHA PEL","0.005 mg/m3"],["Source","Electroplating, cement, leather tanning"]],
    mutations:[["Homo sapiens","MLH1 / chr3","Mismatch repair silencing"],["Homo sapiens","CDKN2A","Lung carcinoma hotspot"]],
    links:["PubChem 24425","TOXNET 7738945"]
  },
  {
    name:"Ammonia", cas:"7664-41-7", formula:"NH3", iarc:"Not classified", genotoxic:false,
    props:[["Boiling point","-33.3 C"],["OSHA PEL","50 ppm"],["IDLH","300 ppm"],["Source","Agriculture, sewage, fertilizer plants"]],
    mutations:[["Homo sapiens","Mucosal irritation pathway","Respiratory epithelium damage"]],
    links:["PubChem 222","TOXNET 7664417"]
  },
  {
    name:"Manganese", cas:"7439-96-5", formula:"Mn", iarc:"Group 2A Probable", genotoxic:true,
    props:[["Melting point","1246 C"],["WHO water limit","0.4 mg/L"],["Neurological threshold","0.1 mg/m3"],["Source","Mining, alloy production, batteries"]],
    mutations:[["Homo sapiens","SLC30A10 / chr1","Manganese transporter mutation"],["Homo sapiens","PARK7","Parkinsonism pathway"]],
    links:["PubChem 23930","TOXNET 7439965"]
  },
  {
    name:"Acrylamide", cas:"79-06-1", formula:"C3H5NO", iarc:"Group 2A Probable", genotoxic:true,
    props:[["Melting point","84.5 C"],["Solubility","2155 g/L"],["Source","High-temp cooking, polymer production"],["OSHA PEL","0.3 mg/m3"]],
    mutations:[["Homo sapiens","HRAS / chr11","Glycidamide adduct formation"],["Mus musculus","lacI","Point mutation increase"]],
    links:["PubChem 487","TOXNET 79061"]
  },
  {
    name:"Polycyclic aromatic hydrocarbons (mix)", cas:"130498-29-2", formula:"Mixed PAHs", iarc:"Group 1 Carcinogen", genotoxic:true,
    props:[["Source","Petroleum combustion, smoked food, asphalt"],["Key members","Naphthalene, pyrene, fluoranthene"],["Half-life (soil)","Months to years"],["Primary concern","Port Harcourt / Apapa corridor"]],
    mutations:[["Homo sapiens","TP53 / chr17","Bulky adduct formation"],["Homo sapiens","KRAS","Lung adenocarcinoma signature"]],
    links:["PubChem group","TOXNET PAH"]
  },
  {
    name:"Styrene", cas:"100-42-5", formula:"C8H8", iarc:"Group 2A Probable", genotoxic:true,
    props:[["Boiling point","145 C"],["Solubility","0.3 g/L"],["OSHA PEL","100 ppm"],["Source","Plastics, rubber, fibreglass"]],
    mutations:[["Homo sapiens","CYP2E1 / chr10","Styrene oxide metabolite"],["Homo sapiens","HPRT","Point mutation increase"]],
    links:["PubChem 7501","TOXNET 100425"]
  },
  {
    name:"Boron", cas:"7440-42-8", formula:"B", iarc:"Not classified", genotoxic:false,
    props:[["WHO water limit","2.4 mg/L"],["Source","Detergents, ceramics, glass production"],["Primary concern","Industrial discharge into Lagos lagoon"]],
    mutations:[["Homo sapiens","NRF2 pathway","Mild oxidative stress response"]],
    links:["PubChem 5462311","TOXNET 7440428"]
  },
  {
    name:"Cyanide (free)", cas:"57-12-5", formula:"CN(-)", iarc:"Not classified", genotoxic:false,
    props:[["WHO water limit","0.07 mg/L"],["IDLH","25 mg/m3"],["Source","Gold mining, electroplating, jewellery"],["Mechanism","Cytochrome c oxidase inhibition"]],
    mutations:[["Homo sapiens","MT-CO1 / mtDNA","Mitochondrial respiratory chain block"]],
    links:["PubChem 5975505","TOXNET 57125"]
  },
  {
    name:"Ethylene oxide", cas:"75-21-8", formula:"C2H4O", iarc:"Group 1 Carcinogen", genotoxic:true,
    props:[["Boiling point","10.7 C"],["Solubility","Miscible"],["OSHA PEL","1 ppm"],["Source","Sterilisation, plastics manufacturing"]],
    mutations:[["Homo sapiens","HRAS / chr11","N7-guanine alkylation"],["Homo sapiens","Hb adducts","Haemoglobin N-terminal alkylation"]],
    links:["PubChem 6354","TOXNET 75218"]
  },
  {
    name:"2,4-Dichlorophenoxyacetic acid (2,4-D)", cas:"94-75-7", formula:"C8H6Cl2O3", iarc:"Group 2A Probable", genotoxic:false,
    props:[["Melting point","138 C"],["Solubility","0.9 g/L"],["Source","Herbicide, agricultural runoff"],["WHO water limit","0.03 mg/L"]],
    mutations:[["Homo sapiens","BCL2 / chr18","Lymphoma association in meta-analyses"]],
    links:["PubChem 1486","TOXNET 94757"]
  },
  {
    name:"Diethylhexyl phthalate (DEHP)", cas:"117-81-7", formula:"C24H38O4", iarc:"Group 3", genotoxic:false,
    props:[["Boiling point","385 C"],["Solubility","0.0027 g/L"],["Source","PVC plasticiser, medical tubing"],["Bioaccumulation","Moderate"]],
    mutations:[["Homo sapiens","ESR1","Endocrine interference"],["Rattus norvegicus","PPARA","Peroxisome proliferation"]],
    links:["PubChem 4671","TOXNET 117817"]
  },
  {
    name:"Uranium (natural)", cas:"7440-61-1", formula:"U", iarc:"Group 1 Carcinogen", genotoxic:true,
    props:[["Density","19.1 g/cm3"],["WHO water limit","0.03 mg/L"],["Primary route","Ingestion via contaminated water"],["Radiation type","Alpha emitter"]],
    mutations:[["Homo sapiens","TP53 / chr17","Ionising radiation signature"],["Homo sapiens","BRCA1","Double-strand break accumulation"]],
    links:["PubChem 23989","TOXNET 7440611"]
  },
  {
    name:"Tin (organic, tributyltin)", cas:"688-73-3", formula:"(C4H9)3Sn", iarc:"Not classified", genotoxic:false,
    props:[["Boiling point","297 C"],["Source","Antifouling marine paint, Lagos harbour"],["Bioaccumulation","High in molluscs"]],
    mutations:[["Homo sapiens","RXR pathway","Retinoid X receptor disruption"],["Nucella lapillus","imposex gene cluster","Sex reversal in molluscs"]],
    links:["PubChem 12485","TOXNET 688733"]
  },
  {
    name:"Sodium fluoride", cas:"7681-49-4", formula:"NaF", iarc:"Group 3", genotoxic:false,
    props:[["Melting point","993 C"],["Solubility","42 g/L"],["WHO water limit","1.5 mg/L"],["Source","Groundwater, water fluoridation, industrial discharge"]],
    mutations:[["Homo sapiens","Dental/bone tissue","Fluorosis at high doses"]],
    links:["PubChem 16211","TOXNET 7681494"]
  },
  {
    name:"Nitrogen dioxide", cas:"10102-44-0", formula:"NO2", iarc:"Group 1 Carcinogen", genotoxic:true,
    props:[["Boiling point","21 C"],["WHO annual limit","10 ug/m3"],["Source","Vehicle exhaust, diesel generators"],["Primary concern","Lagos traffic corridors, generator-heavy zones"]],
    mutations:[["Homo sapiens","SOD2 / chr6","Oxidative DNA strand breaks"],["Homo sapiens","GPX1","Glutathione peroxidase depletion"]],
    links:["PubChem 3032552","TOXNET 10102440"]
  },
  {
    name:"Hexachlorobenzene", cas:"118-74-1", formula:"C6Cl6", iarc:"Group 2A Probable", genotoxic:true,
    props:[["Melting point","230 C"],["Solubility","0.000062 g/L"],["Half-life (human)","3 to 6 yr"],["Source","Fungicide, industrial by-product"]],
    mutations:[["Homo sapiens","CYP1A2","Porphyrin metabolism disruption"],["Rattus norvegicus","AHR","Dioxin-like receptor activation"]],
    links:["PubChem 8370","TOXNET 118741"]
  },
  {
    name:"Chlorpyrifos", cas:"2921-88-2", formula:"C9H11Cl3NO3PS", iarc:"Group 2A Probable", genotoxic:false,
    props:[["Melting point","42 C"],["Solubility","0.0014 g/L"],["Primary use","Agricultural pesticide"],["Mechanism","Cholinesterase inhibitor"]],
    mutations:[["Homo sapiens","PON1 / chr7","Paraoxonase polymorphism susceptibility"],["Danio rerio","ache","Developmental neurotoxicity"]],
    links:["PubChem 2730","TOXNET 2921882"]
  },
  {
    name:"Ozone (tropospheric)", cas:"10028-15-6", formula:"O3", iarc:"Group 1 Carcinogen", genotoxic:true,
    props:[["WHO 8h limit","100 ug/m3"],["Source","Photochemical smog, vehicle exhaust reaction"],["Primary concern","Lagos midday heat-smog events"]],
    mutations:[["Homo sapiens","GSTP1","Oxidative lipid peroxidation"],["Homo sapiens","TP53 / chr17","Oxidative stress base modification"]],
    links:["PubChem 24823","TOXNET 10028156"]
  },
];
