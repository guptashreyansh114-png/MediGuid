/* MediGuide data file
   All disease content lives here. To add a new disease, copy one object and edit it.
   Content is general educational information, not medical advice. */

const SYMPTOMS = [
  "Fever", "Chills", "Cough", "Sore throat", "Runny nose", "Headache", "Body pain",
  "Fatigue", "Dizziness", "Nausea", "Vomiting", "Diarrhea", "Abdominal pain",
  "Loss of appetite", "Shortness of breath", "Wheezing", "Chest tightness", "Chest pain",
  "Night sweats", "Weight loss", "Excessive thirst", "Frequent urination", "Blurred vision",
  "Yellow skin or eyes", "Dark urine", "Pale skin", "Skin rash", "Light sensitivity"
];

const TIPS = [
  "Wash your hands with soap for at least 20 seconds, especially before eating and after using the toilet.",
  "Drink safe, clean water. Boil or filter water if you are unsure about its source.",
  "Aim for at least 30 minutes of physical activity most days of the week.",
  "Include fruits, vegetables and whole grains in your daily meals, and limit salt and sugar.",
  "Get 7 to 8 hours of sleep. Good sleep supports your immune system and mood.",
  "Do not let water collect in pots, coolers or tyres. Standing water breeds mosquitoes.",
  "Do not take antibiotics without a doctor's prescription.",
  "Get regular check-ups, especially if diabetes or high blood pressure runs in your family.",
  "Avoid smoking and tobacco. Quitting helps your lungs and heart at any age.",
  "Cover your mouth and nose when you cough or sneeze, and stay home when you are ill."
];

const DISEASES = [
  {
    id: "diabetes",
    name: "Diabetes (Type 2)",
    icon: "🩸",
    category: "Chronic",
    specialist: "Endocrinologist / Diabetologist",
    specKeys: ["endocrin", "diabet", "general", "internal"],
    summary: "A long-term condition in which the body cannot use insulin properly, so blood sugar stays high.",
    tags: ["Excessive thirst", "Frequent urination", "Fatigue", "Blurred vision", "Weight loss"],
    symptoms: ["Increased thirst and hunger", "Frequent urination", "Tiredness", "Blurred vision", "Slow-healing cuts or frequent infections"],
    causes: ["Insulin resistance, often linked to excess body weight", "Physical inactivity and unhealthy diet", "Family history", "Increasing age"],
    treatment: [
      "Healthy eating plan and regular physical activity",
      "Weight management",
      "Medicines or insulin as prescribed by a doctor",
      "Regular blood sugar monitoring and HbA1c tests",
      "Regular eye, foot, kidney and heart check-ups"
    ],
    prevention: ["Maintain a healthy weight", "Exercise regularly", "Limit sugary drinks and refined foods", "Get screened if you are overweight or have a family history"],
    seeDoctor: "See a doctor if you have constant thirst, frequent urination, unexplained weight loss, blurred vision or wounds that do not heal.",
    emergency: "Seek urgent care for confusion, extreme drowsiness, repeated vomiting, fruity-smelling breath or very high or very low blood sugar."
  },
  {
    id: "hypertension",
    name: "Hypertension (High Blood Pressure)",
    icon: "❤️",
    category: "Chronic",
    specialist: "Cardiologist / Physician",
    specKeys: ["cardio", "heart", "general", "internal"],
    summary: "A condition where the force of blood against artery walls is consistently too high, raising the risk of heart attack and stroke.",
    tags: ["Headache", "Dizziness", "Chest pain", "Shortness of breath"],
    symptoms: ["Often no symptoms at all", "Headache or dizziness in some people", "Shortness of breath or chest discomfort in severe cases"],
    causes: ["Too much salt in the diet", "Obesity and lack of exercise", "Smoking and excess alcohol", "Stress, family history, ageing, kidney problems"],
    treatment: [
      "Reduce salt, eat more fruits and vegetables",
      "Exercise regularly and lose excess weight",
      "Stop smoking and limit alcohol",
      "Blood pressure medicines as prescribed by a doctor",
      "Regular home or clinic blood pressure monitoring"
    ],
    prevention: ["Check your blood pressure regularly", "Eat a low-salt, balanced diet", "Stay active", "Manage stress and sleep well"],
    seeDoctor: "Get your blood pressure checked regularly, especially after age 30 or if it runs in your family. Because it often has no symptoms, regular checks matter.",
    emergency: "Seek urgent care for severe headache, chest pain, trouble speaking, weakness on one side of the body or sudden vision changes."
  },
  {
    id: "asthma",
    name: "Asthma",
    icon: "🫁",
    category: "Respiratory",
    specialist: "Pulmonologist (chest specialist)",
    specKeys: ["pulmon", "chest", "respir", "general", "internal"],
    summary: "A chronic lung condition in which the airways become inflamed and narrow, causing wheezing and breathlessness.",
    tags: ["Cough", "Wheezing", "Shortness of breath", "Chest tightness"],
    symptoms: ["Wheezing (whistling sound when breathing)", "Shortness of breath", "Chest tightness", "Coughing, often at night or early morning"],
    causes: ["Allergens such as dust mites, pollen, pet hair", "Air pollution and smoke", "Cold air, exercise, infections", "Family history of asthma or allergies"],
    treatment: [
      "Quick-relief (reliever) inhalers during an attack, as prescribed",
      "Long-term controller medicines prescribed by a doctor",
      "Identifying and avoiding triggers",
      "A written asthma action plan from your doctor",
      "Regular follow-up and lung function tests"
    ],
    prevention: ["Avoid known triggers and tobacco smoke", "Keep bedding and rooms clean and dust-free", "Get vaccinated against flu as advised"],
    seeDoctor: "See a doctor if you cough or wheeze often, get breathless with activity, or your symptoms disturb sleep.",
    emergency: "Seek emergency care if breathing is very difficult, you cannot speak a full sentence, lips turn bluish, or your reliever inhaler does not help."
  },
  {
    id: "dengue",
    name: "Dengue Fever",
    icon: "🦟",
    category: "Infectious",
    specialist: "General Physician / Infectious Disease specialist",
    specKeys: ["general", "internal", "infect", "medicine", "pediatric"],
    summary: "A viral infection spread by Aedes mosquitoes that bite mostly during the day. It is common during and after the monsoon.",
    tags: ["Fever", "Headache", "Body pain", "Skin rash", "Nausea", "Fatigue"],
    symptoms: ["Sudden high fever", "Severe headache and pain behind the eyes", "Muscle and joint pain", "Rash, nausea, vomiting", "Tiredness"],
    causes: ["Dengue virus transmitted by the bite of an infected Aedes mosquito"],
    treatment: [
      "There is no specific antiviral medicine, so treatment supports the body",
      "Plenty of rest and fluids (water, ORS, coconut water, soups)",
      "Paracetamol for fever only as advised by a doctor",
      "Avoid aspirin and ibuprofen-type painkillers unless a doctor says so, as they can raise bleeding risk",
      "Doctor-guided blood tests (such as platelet count) and hospital care if warning signs appear"
    ],
    prevention: ["Remove standing water from coolers, pots and tyres", "Use mosquito nets, repellents and full-sleeve clothes", "Keep doors and windows screened"],
    seeDoctor: "See a doctor early if you have fever with severe body pain, headache or rash, especially during the monsoon season.",
    emergency: "Go to a hospital immediately for severe stomach pain, repeated vomiting, bleeding from gums or nose, blood in vomit or stool, drowsiness, restlessness or cold, clammy skin."
  },
  {
    id: "malaria",
    name: "Malaria",
    icon: "🦟",
    category: "Infectious",
    specialist: "General Physician / Infectious Disease specialist",
    specKeys: ["general", "internal", "infect", "medicine", "pediatric"],
    summary: "A parasitic infection spread by the bite of infected Anopheles mosquitoes, causing recurring fever and chills.",
    tags: ["Fever", "Chills", "Headache", "Body pain", "Nausea", "Vomiting", "Fatigue"],
    symptoms: ["Fever with shaking chills and sweating", "Headache", "Body aches", "Nausea and vomiting", "Weakness"],
    causes: ["Plasmodium parasites passed on by infected Anopheles mosquitoes"],
    treatment: [
      "Confirm with a blood test (smear or rapid test) before treatment",
      "Antimalarial medicines prescribed by a doctor, chosen by parasite type",
      "Complete the full course even if you feel better",
      "Rest and plenty of fluids",
      "Hospital care for severe malaria"
    ],
    prevention: ["Sleep under mosquito nets", "Use repellents and wear covering clothes", "Drain stagnant water near homes"],
    seeDoctor: "See a doctor promptly for fever with chills, especially if mosquitoes are common where you live or you recently travelled.",
    emergency: "Seek urgent care for confusion, seizures, severe weakness, breathing difficulty, very dark urine or yellow eyes."
  },
  {
    id: "typhoid",
    name: "Typhoid Fever",
    icon: "🌡️",
    category: "Infectious",
    specialist: "General Physician / Gastroenterologist",
    specKeys: ["general", "internal", "gastro", "infect", "medicine"],
    summary: "A bacterial infection spread through contaminated food and water, causing prolonged fever and stomach problems.",
    tags: ["Fever", "Headache", "Abdominal pain", "Fatigue", "Loss of appetite", "Diarrhea"],
    symptoms: ["Fever that rises step by step over days", "Headache and weakness", "Stomach pain", "Loss of appetite", "Diarrhea or constipation"],
    causes: ["Salmonella Typhi bacteria in contaminated food or water", "Poor sanitation and unwashed hands"],
    treatment: [
      "Blood tests and culture to confirm the infection",
      "Antibiotics prescribed by a doctor, taken for the full course",
      "Rest, clean fluids and light, easily digestible food",
      "Hospital care if the illness is severe"
    ],
    prevention: ["Typhoid vaccine as advised by a doctor", "Drink boiled or filtered water", "Eat freshly cooked food and avoid unhygienic street food", "Wash hands with soap"],
    seeDoctor: "See a doctor if fever lasts more than 3 days, especially with stomach pain or weakness.",
    emergency: "Seek urgent care for severe abdominal pain, blood in stool, confusion or very high fever that does not come down."
  },
  {
    id: "anemia",
    name: "Anemia (Iron Deficiency)",
    icon: "🩸",
    category: "Blood",
    specialist: "General Physician / Hematologist",
    specKeys: ["general", "internal", "hematol", "haemat", "medicine", "gynae"],
    summary: "A condition where the blood has too few healthy red blood cells or too little haemoglobin to carry oxygen, often due to low iron.",
    tags: ["Fatigue", "Pale skin", "Dizziness", "Shortness of breath", "Headache"],
    symptoms: ["Constant tiredness and weakness", "Pale skin", "Dizziness", "Shortness of breath on activity", "Headache, cold hands and feet"],
    causes: ["Low iron, vitamin B12 or folate in the diet", "Blood loss (heavy periods, ulcers, worms)", "Pregnancy needs", "Chronic diseases"],
    treatment: [
      "Find the cause with a doctor and blood tests",
      "Iron-rich foods such as leafy greens, lentils, jaggery, dates and meat, with vitamin C sources",
      "Iron, B12 or folic acid supplements only as prescribed",
      "Treating the underlying cause, such as worms or bleeding"
    ],
    prevention: ["Eat a balanced diet rich in iron", "Regular check-ups during pregnancy and adolescence", "Deworming as advised by a doctor"],
    seeDoctor: "See a doctor if you feel tired all the time, look pale, or get breathless with light activity.",
    emergency: "Seek urgent care for chest pain, fainting, very fast heartbeat or severe breathlessness."
  },
  {
    id: "tuberculosis",
    name: "Tuberculosis (TB)",
    icon: "🫁",
    category: "Infectious",
    specialist: "Pulmonologist / TB specialist",
    specKeys: ["pulmon", "chest", "tb", "respir", "general", "internal"],
    summary: "A bacterial infection that mainly affects the lungs and spreads through the air when an infected person coughs.",
    tags: ["Cough", "Fever", "Night sweats", "Weight loss", "Chest pain", "Fatigue"],
    symptoms: ["Cough lasting more than 2 weeks", "Fever and night sweats", "Unexplained weight loss", "Chest pain", "Tiredness, sometimes blood in sputum"],
    causes: ["Mycobacterium tuberculosis bacteria spread through the air", "Weak immunity, malnutrition, diabetes, crowded living"],
    treatment: [
      "Diagnosis with sputum test and chest X-ray",
      "A combination of antibiotics taken for several months, usually at least 6",
      "Never stop or skip medicines, as incomplete treatment can lead to drug-resistant TB",
      "In India, diagnosis and treatment are available free at government centres under the National TB Elimination Programme (NTEP)"
    ],
    prevention: ["BCG vaccination for infants", "Cover your mouth when coughing", "Good ventilation", "Complete treatment so the infection does not spread"],
    seeDoctor: "See a doctor if you cough for more than 2 weeks, or have fever, night sweats or weight loss.",
    emergency: "Seek urgent care for coughing up blood, severe breathlessness or severe chest pain."
  },
  {
    id: "flu",
    name: "Common Cold and Influenza (Flu)",
    icon: "🤧",
    category: "Infectious",
    specialist: "General Physician",
    specKeys: ["general", "internal", "medicine", "pediatric", "ent"],
    summary: "Viral infections of the nose, throat and lungs. They are very common and usually mild, but flu can sometimes be serious.",
    tags: ["Fever", "Cough", "Sore throat", "Runny nose", "Body pain", "Fatigue", "Headache"],
    symptoms: ["Runny or blocked nose", "Sore throat and cough", "Fever and chills (more common in flu)", "Body aches and tiredness", "Headache"],
    causes: ["Cold and influenza viruses spread by droplets and contaminated surfaces"],
    treatment: [
      "Rest and plenty of warm fluids",
      "Steam inhalation and saltwater gargles for comfort",
      "Paracetamol for fever or pain as advised by a doctor",
      "Antibiotics do not work on viruses, so use them only if a doctor finds a bacterial infection"
    ],
    prevention: ["Wash hands often", "Cover coughs and sneezes", "Annual flu vaccine as advised", "Avoid close contact with sick people"],
    seeDoctor: "See a doctor if fever lasts more than 3 days, symptoms get worse, or you are elderly, pregnant or have a chronic illness.",
    emergency: "Seek urgent care for breathing difficulty, chest pain, confusion or bluish lips."
  },
  {
    id: "migraine",
    name: "Migraine",
    icon: "🧠",
    category: "Neurological",
    specialist: "Neurologist",
    specKeys: ["neuro", "general", "internal"],
    summary: "A neurological condition causing repeated, often one-sided throbbing headaches, sometimes with nausea and sensitivity to light.",
    tags: ["Headache", "Nausea", "Vomiting", "Light sensitivity", "Dizziness"],
    symptoms: ["Throbbing headache, often on one side", "Nausea or vomiting", "Sensitivity to light and sound", "Visual disturbances (aura) in some people"],
    causes: ["Exact cause is not fully known", "Triggers include stress, lack of sleep, skipped meals, bright light and certain foods", "Family history"],
    treatment: [
      "Rest in a quiet, dark room during an attack",
      "Pain-relief or migraine-specific medicines as prescribed by a doctor",
      "Keeping a headache diary to find triggers",
      "Preventive medicines for frequent attacks, prescribed by a doctor"
    ],
    prevention: ["Regular sleep and meals", "Manage stress", "Stay hydrated", "Avoid personal triggers"],
    seeDoctor: "See a doctor if headaches are frequent, getting worse or disturb daily life.",
    emergency: "Seek urgent care for a sudden severe headache, headache with weakness, trouble speaking, confusion, stiff neck or fever."
  },
  {
    id: "jaundice",
    name: "Jaundice (Hepatitis A/E)",
    icon: "🟡",
    category: "Digestive",
    specialist: "Gastroenterologist / Hepatologist",
    specKeys: ["gastro", "hepat", "liver", "general", "internal", "medicine"],
    summary: "Yellowing of the skin and eyes due to excess bilirubin, often caused by liver infections such as hepatitis A or E spread by contaminated water.",
    tags: ["Yellow skin or eyes", "Dark urine", "Fatigue", "Nausea", "Abdominal pain", "Loss of appetite", "Fever"],
    symptoms: ["Yellow skin and eyes", "Dark urine and pale stools", "Tiredness and loss of appetite", "Nausea, stomach pain", "Mild fever"],
    causes: ["Hepatitis A or E virus through contaminated food and water", "Other liver infections or disease", "Alcohol and some medicines", "Gallstones or blocked bile ducts"],
    treatment: [
      "Liver function tests to find the cause",
      "Rest, plenty of fluids and light, fat-free meals",
      "Avoid alcohol and any medicine not prescribed by your doctor",
      "Specific treatment depends on the cause and is guided by a doctor",
      "Do not rely on unproven home or traditional remedies instead of medical care"
    ],
    prevention: ["Drink safe water and eat hygienic food", "Hepatitis A and B vaccines as advised", "Wash hands with soap", "Avoid sharing needles or razors"],
    seeDoctor: "See a doctor as soon as you notice yellow eyes or skin, or dark urine.",
    emergency: "Seek urgent care for confusion, extreme sleepiness, vomiting blood or swelling of the abdomen."
  },
  {
    id: "gastroenteritis",
    name: "Gastroenteritis (Diarrhea and Vomiting)",
    icon: "🤢",
    category: "Digestive",
    specialist: "General Physician / Gastroenterologist",
    specKeys: ["general", "internal", "gastro", "pediatric", "medicine"],
    summary: "Inflammation of the stomach and intestines, usually from infection, causing loose stools, vomiting and cramps.",
    tags: ["Diarrhea", "Vomiting", "Abdominal pain", "Nausea", "Fever"],
    symptoms: ["Loose watery stools", "Vomiting and nausea", "Stomach cramps", "Mild fever", "Weakness and signs of dehydration"],
    causes: ["Viruses, bacteria or parasites from contaminated food and water", "Poor hand hygiene"],
    treatment: [
      "Oral rehydration solution (ORS) and plenty of safe fluids",
      "Continue feeding, with light food as tolerated",
      "Zinc supplements for children, as advised by a doctor",
      "Antibiotics or anti-diarrhoeal medicines only if a doctor prescribes them"
    ],
    prevention: ["Wash hands before eating and after the toilet", "Drink safe water", "Store and cook food hygienically", "Rotavirus vaccine for infants as advised"],
    seeDoctor: "See a doctor if diarrhea lasts more than 2 days, or if there is blood in stool or high fever.",
    emergency: "Seek urgent care for signs of dehydration: very dry mouth, no urine for many hours, sunken eyes, extreme weakness or drowsiness, especially in babies, children and the elderly."
  },
  {
    id: "pneumonia",
    name: "Pneumonia",
    icon: "🫁",
    category: "Respiratory",
    specialist: "Pulmonologist / General Physician",
    specKeys: ["pulmon", "chest", "respir", "general", "internal", "medicine", "pediatric"],
    summary: "An infection that inflames the air sacs in one or both lungs, which may fill with fluid or pus.",
    tags: ["Fever", "Cough", "Shortness of breath", "Chest pain", "Chills", "Fatigue"],
    symptoms: ["Cough, sometimes with phlegm", "Fever and chills", "Fast or difficult breathing", "Chest pain when breathing or coughing", "Tiredness"],
    causes: ["Bacteria, viruses or fungi", "Risk is higher in young children, the elderly, smokers and people with weak immunity"],
    treatment: [
      "Diagnosis by a doctor, often with a chest X-ray",
      "Antibiotics if the cause is bacterial, as prescribed",
      "Rest, fluids and fever control as advised",
      "Hospital care with oxygen for moderate to severe cases"
    ],
    prevention: ["Vaccines such as pneumococcal and flu, as advised", "Do not smoke", "Wash hands", "Treat colds and flu early"],
    seeDoctor: "See a doctor promptly for cough with fever and fast breathing, especially in children, older adults and people with chronic illness.",
    emergency: "Seek emergency care for severe breathlessness, bluish lips, confusion or chest pain."
  }
];
