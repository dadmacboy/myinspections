
'use strict';

const APP_KEY='uh-field-next-v100',DRAFT_KEY=APP_KEY+'-inspection-draft',APP_VERSION='1.0.2';
const EHS_SECTIONS=[
  {name:'General Safety',items:[
    ['Do all unit entry and bedroom doors open/close/lock properly?',false],
    ['Are all government provided free-standing furnishings and equipment properly anchored as required?',false],
    ['Is the unit free of any identified gas or propane hazards ("rotten eggs" smell, disconnected gas appliances, or gas equipment, etc.)?',false],
    ['Are interior GFCI outlets (within six feet of a water source) present and operable?',false],
    ['Is the unit free of any identified electrical hazards (tripped breakers that will not reset, overloaded outlets, scorch marks on outlets, etc.)?',false],
    ['Are floors and carpets free from slip/trip/fall hazards (peeling, bulging, buckling, etc.)?',false]
  ]},
  {name:'Mold/Moisture Control',items:[
    ['Is the unit free of visible mold, water damage/stains, persistent dampness/moisture on all surfaces, surface coverings and around doors and windows?',false],
    ['Is the unit free of any visible signs of leaks at plumbing fixtures, joints or appliances?',false],
    ['Is the unit free of any strong musty odors?',false]
  ]},
  {name:'Pest Management',items:[['Does the unit appear to be free of pests?',false]]},
  {name:'Water',items:[
    ['Is the unit tap water free of any visual discoloration?',false],
    ['Is the unit tap water free of any oily consistency?',false],
    ['Is the unit tap water free of any odors?',false],
    ['Does the unit have adequate water pressure?',false],
    ['Is the hot water temperature between 110-120 Fahrenheit, measured at the bathtub spout and kitchen faucet?',false]
  ]},
  {name:'HVAC',items:[
    ['Are all unit exhaust fans in working order (Kitchen, Bathroom, Laundry, etc.)?',true],
    ['Is the heating system capable of maintaining unit indoor Winter design temperatures?',false],
    ['Is the air conditioning system capable of maintaining unit indoor Summer design temperatures?',true],
    ['Is the humidifier/dehumidifier in working order?',true]
  ]},
  {name:'Smoke and Carbon Monoxide Detectors and Fire Sprinklers',items:[
    ['Does unit have Smoke Detectors, and do they appear to be free of damage that would impair operation?',true],
    ['Does unit have Carbon Monoxide Detectors, and do they appear to be free of damage that would impair operation?',true],
    ['Are the unit fire sprinkler heads free of paint or covering?',true],
    ['Are the unit fire sprinkler effective spray areas free of any obstructions (i.e., anything hanging from a sprinkler head)?',true]
  ]}
];
const COMPONENT_SECTIONS=[
  {name:'Kitchen/Kitchenette',items:['Cabinets/Shelving','Carbon Monoxide Detectors','Electric Outlets/Switches','Light Fixtures','Sink (including fixtures/plumbing)','Smoke Detectors','Sprinklers','Additional Items']},
  {name:'Appliances',items:['Dishwasher','Dryer','Microwave','Range Vent/Hood/Exhaust Fan','Range/Cooktop/Stove','Refrigerator','Washer','Additional Items']},
  {name:'Bathroom',items:['Cabinets/Shelving','Carbon Monoxide Detectors','Electric Outlets/Switches','Fan Vent/Ventilation/Exhaust Fans','Light Fixtures','Shower (including fixtures/joints)','Sink (including fixtures/plumbing)','Smoke Detectors','Sprinklers','Toilet/Commode','Tub (including fixtures)','Vanity','Additional Items']},
  {name:'Bedroom',items:['Carbon Monoxide Detectors','Ceiling Fan','Closet Shelves','Door(s)','Floors/Carpets','Furniture','Light Fixtures','Smoke Detectors','Sprinklers','Window Area/Glass (including screens)','Additional Items']},
  {name:'Living Area',items:['Carbon Monoxide Detectors','Door(s)','Floors/Carpets','Furniture','Light Fixtures','Smoke Detectors','Sprinklers','Window Area/Glass (including screens)','Additional Items']}
];
const COMMAND_EHS_SECTIONS=[
  {name:'General Safety',items:[
    ['Does every habitable room meet local/building/occupancy ordinance requirements for egress for emergency escape and rescue opening?',[]],
    ['Do building/unit exterior doors and operable windows open, close and lock properly?',[]],
    ['Do all unit entry and bedroom doors open/close/lock properly?',[]],
    ['Are all Fire Doors and Emergency Exits unlocked and in working order?',['N/A']],
    ['Are there properly secured handrails and guard rails on all interior and exterior stairs, stairwells and walkways?',['N/A']],
    ['Are all government provided free-standing furnishings and equipment properly anchored as required?',[]],
    ['Is the unit free of any identified gas or propane hazards ("rotten eggs" smell, disconnected gas appliances, or gas equipment, etc.)?',[]],
    ['Is the building free of any identified gas or propane hazards ("rotten eggs" smell, disconnected gas appliances, or gas equipment, etc.)?',[]],
    ['Are interior GFCI outlets (within six feet of a water source) present and operable?',[]],
    ['Is the unit free of any identified electrical hazards (tripped breakers that will not reset, overloaded outlets, scorch marks on outlets, etc.)?',[]],
    ['Are unit floors and carpets free from slip/trip/fall hazards (peeling, bulging, buckling, etc.)?',[]]
  ]},
  {name:'Mold/Moisture Control',items:[
    ['Is the unit free of visible mold, water damage/stains, persistent dampness/moisture on all surfaces, surface coverings and around doors and windows?',[]],
    ['Is the building/unit free from any exterior water intrusion?',[]],
    ['Is the unit free of any visible signs of leaks at plumbing fixtures, joints or appliances?',[]],
    ['Is the unit free of any strong musty odors?',[]],
    ['Is the building free of any visible standing water against the foundation?',[]]
  ]},
  {name:'Pest Management',items:[['Does the unit appear to be free of pests?',[]]]},
  {name:'Asbestos',items:[['Is potential asbestos containing material (ACM) in the unit free of visible damage (walls, ceilings, fibrous pipe, insulation, tile flooring, etc.)?',['Unknown']]]},
  {name:'Water',items:[
    ['Has the water (sink faucets, drinking fountains, etc.) been tested in accordance with the Safe Drinking Water Act and State Regulations as applicable by service standards?',[]],
    ['Is the unit tap water free of any visual discoloration?',[]],
    ['Is the unit tap water free of any oily consistency?',[]],
    ['Is the unit tap water free of any odors?',[]],
    ['Does the unit have adequate water pressure?',[]],
    ['Is the hot water temperature between 110-120 Fahrenheit, measured at the bathtub spout and kitchen faucet?',[]],
    ['If the unit has a water filtration system have the filters been changed according to the manufacturer’s guidelines?',['Unknown','N/A']],
    ['If no, is the water filtration system still required?',['Unknown','N/A']]
  ]},
  {name:'HVAC',items:[
    ['Are all unit exhaust fans in working order (Kitchen, Bathroom, Laundry, etc.)?',['N/A']],
    ['If there is in unit laundry are the dryer vent(s) in working order?',['N/A']],
    ['Is the heating system capable of maintaining unit indoor Winter design temperatures?',[]],
    ['Does unit have HVAC temperature control?',[]],
    ['Is the air conditioning system capable of maintaining unit indoor Summer design temperatures?',['N/A']],
    ['Is the humidifier/dehumidifier in working order?',['N/A']],
    ['Is the unit free of any visible damage to or leaks in ducts (No visible gaps, tears, or holes in ducts)?',['N/A']],
    ['Is the unit HVAC filter clean?',['N/A']]
  ]},
  {name:'Smoke and Carbon Monoxide Detectors and Fire Sprinklers',items:[
    ['Does unit have Smoke Detectors, and do they appear to be free of damage that would impair operation?',['N/A']],
    ['Does unit have Carbon Monoxide Detectors, and do they appear to be free of damage that would impair operation?',['N/A']],
    ['Are the unit fire sprinkler heads free of paint or covering?',['N/A']],
    ['Are the unit fire sprinkler effective spray areas free of any obstructions (i.e. anything hanging from a sprinkler head)?',['N/A']],
    ['Is the building fire alarm control panel and alarm system in working order?',['N/A']],
    ['Does the building have a continuous (24/7) fire watch?',['N/A']]
  ]}
];
const COMMAND_COMPONENT_SECTIONS=[
  {name:'Kitchen/Kitchenette',items:['Cabinets/Shelving','Carbon Monoxide Detectors','Ceiling','Chair(s)','Counter/Counter Tops','Door(s)','Electric Outlets/Switches','Floors/Carpets','Light Fixtures','Sink (including fixtures/plumbing)','Smoke Detectors','Sprinklers','Table','Trash and Recycling Receptacles','Wall(s)','Window Area/Glass (including screens)','Additional Items']},
  {name:'Appliances',items:['Dehumidifier','Dishwasher','Dryer','Freezer','Microwave','Range Vent/Hood/Exhaust Fan','Range/Cooktop/Stove','Refrigerator','Washer','Additional Items']},
  {name:'Bathroom',items:['Cabinets/Shelving','Carbon Monoxide Detectors','Ceiling','Counter/Counter Tops','Door(s)','Electric Outlets/Switches','Fan Vent/Ventilation/Exhaust Fans','Floors/Carpets','Light Fixtures','Mirrors','Radiator','Shower (including fixtures/joints)','Shower Curtain/Door/Rods','Sink (including fixtures/plumbing)','Smoke Detectors','Sprinklers','Toilet/Commode','Towel Rack','Tub (including fixtures)','Vanity','Wall(s)','Window Area/Glass (including screens)','Additional Items']},
  {name:'Bedroom',items:['Bedding/Linen','Built-In Furniture','Carbon Monoxide Detectors','Ceiling','Ceiling Fan','Closet Shelves','Curtain/Blinds','Door(s)','Electric Outlets/Switches','Floors/Carpets','Furniture','Gear Adrift (property not stored away)','Light Fixtures','Laundry','Locker/Closet','Smoke Detectors','Sprinklers','Trash','Wall(s)','Window Area/Glass (including screens)','Additional Items']},
  {name:'Living Area',items:['Built-In Furniture','Carbon Monoxide Detectors','Ceiling','Ceiling Fan','Closet Shelves','Curtain/Blinds','Door(s)','Electric Outlets/Switches','Floors/Carpets','Furniture','Gear Adrift (property not stored away)','Light Fixtures','Laundry','Locker/Closet','Smoke Detectors','Sprinklers','Trash','Wall(s)','Window Area/Glass (including screens)','Additional Items']}
];
const FURNITURE=[['Bed frame / single twin set','perMarine',1],['Twin mattress','perMarine',1],['Desk','perMarine',1],['Desk chair','perMarine',1],['Dresser','perMarine',1],['Wall locker / closet','perMarine',1],['Wall-unit secretary / additional desk unit','custom',0],['Framed mirror','perRoom',1],['Area rug','perRoom',1],['Floor lamp','perRoom',1],['Microwave','perRoom',1],['Small refrigerator','perRoom',1],['Window treatment / curtain','perRoom',1],['Dehumidifier','perRoom',1]].map(([item,mode,qty])=>({item,mode,qty}));
const RATINGS=[['','Select'],['G','G - Good'],['F','F - Fair'],['P','P - Poor'],['EHS','EHS'],['N/A','N/A']];
const CONDITION_CODES=[['','None'],['BR','BR - Broken (repair/replace)'],['BU','BU - Burned'],['C','C - Requires cleaning'],['CH','CH - Chipped'],['CL','CL - Clogged (total/partial)'],['CR','CR - Cracked'],['DA','DA - Damaged'],['FS','FS - Foul Smell'],['FWT','FWT - Fair Wear and Tear'],['MI','MI - Missing'],['MO','MO - Suspect Mold'],['ND','ND - Need Defrosting'],['NH','NH - Nail Hole'],['NP','NP - Needs Paint'],['NWT','NWT - Non-Fair Wear and Tear'],['R','R - Maintenance/repair required'],['S','S - Soiled'],['SC','SC - Scratch'],['SP','SP - Spot'],['ST','ST - Stained'],['TO','TO - Torn'],['WA','WA - Warped']];
const BUILDING_400_COMPONENTS={
  'Kitchen/Kitchenette':[],
  'Appliances':['Microwave','Refrigerator'],
  'Bathroom':['Fan Vent/Ventilation/Exhaust Fans','Light Fixtures','Shower (including fixtures/joints)','Sink (including fixtures/plumbing)','Toilet/Commode','Tub (including fixtures)','Vanity'],
  'Bedroom':['Closet Shelves','Door(s)','Floors/Carpets','Furniture','Light Fixtures','Smoke Detectors','Window Area/Glass (including screens)'],
  'Living Area':[]
};
window.UH_FORM_EHS_STANDARD=EHS_SECTIONS;
window.UH_FORM_COMPONENTS_STANDARD=COMPONENT_SECTIONS;
window.UH_FORM_EHS_COMMAND=COMMAND_EHS_SECTIONS;
window.UH_FORM_COMPONENTS_COMMAND=COMMAND_COMPONENT_SECTIONS;
const USMC_GRADES=[
  ['E-1','Private'],['E-2','Private First Class'],['E-3','Lance Corporal'],['E-4','Corporal'],['E-5','Sergeant'],['E-6','Staff Sergeant'],['E-7','Gunnery Sergeant'],['E-8','Master Sergeant'],['E-8','First Sergeant'],['E-9','Master Gunnery Sergeant'],['E-9','Sergeant Major'],
  ['W-1','Warrant Officer'],['W-2','Chief Warrant Officer 2'],['W-3','Chief Warrant Officer 3'],['W-4','Chief Warrant Officer 4'],['W-5','Chief Warrant Officer 5'],
  ['O-1','Second Lieutenant'],['O-2','First Lieutenant'],['O-3','Captain'],['O-4','Major'],['O-5','Lieutenant Colonel'],['O-6','Colonel'],['O-7','Brigadier General'],['O-8','Major General'],['O-9','Lieutenant General'],['O-10','General']
];
const DEFAULT_BM_ASSIGNMENTS=``;
const emptyState=()=>({version:APP_VERSION,settings:{installation:'MCAS Futenma',installationCode:'FT',inspector:'',buildings:`218
219
223
225
226
229
400
417
428
429
431
460
461`,buildingManagers:`David Silvaloaso
Marcus Rivera
Darius Bruce
Columbus Wilson
Naomi Davis
Anthony LeCrone`,bmAssignments:'',acknowledged:false},records:[]});
let state=loadState(),draft=loadDraft(),route=draft?'inspection':'modules',pendingType='Check-In',deferredInstall=null,rangeFrom='',rangeTo='';
const app=document.querySelector('#app'),dialog=document.querySelector('#dialog'),dialogBody=document.querySelector('#dialogBody');

function loadState(){try{const base=emptyState();let saved=JSON.parse(localStorage.getItem(APP_KEY)||'null');if(!saved){for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i)||'';if(!/uh[-_ ]?field/i.test(k)||k===APP_KEY)continue;try{const candidate=JSON.parse(localStorage.getItem(k)||'null');const core=candidate?.backupType==='UHFieldAppFull'?candidate.core:candidate;if(core&&Array.isArray(core.records)&&core.settings){saved=core;localStorage.setItem(APP_KEY,JSON.stringify({...base,...core,_migratedFrom:k,_migratedAt:new Date().toISOString()}));break}}catch{}}}if(!saved)return base;const settings={...base.settings,...(saved.settings||{})};if(!settings.buildings&&settings.buildingRoster)settings.buildings=String(settings.buildingRoster).split(/\r?\n/).map(x=>x.split('|')[0].trim()).filter(Boolean).join('\n');if(!settings.buildingManagers&&settings.buildingRoster)settings.buildingManagers=[...new Set(String(settings.buildingRoster).split(/\r?\n/).map(x=>x.split('|').slice(1).join('|').trim()).filter(Boolean))].join('\n');return{...base,...saved,settings}}catch{return emptyState()}}
function loadDraft(){try{return normalizeDraft(JSON.parse(localStorage.getItem(DRAFT_KEY)))}catch{return null}}
function normalizeDraft(d){if(!d)return null;d.ehsResponses=(d.ehsResponses||[]).map(r=>({...r,choices:r.choices||['Yes','No',...(r.allowNA?['N/A']:[])]}));d.sectionComments=d.sectionComments||{};d.componentSectionNA=d.componentSectionNA||{};d.followUp=d.followUp||[];d.signatures=d.signatures||{housingRep:'',resident:''};d.extraFields=d.extraFields||{fireAlarmInspectionDate:''};d.formFields={installation:'CAMP BUTLER MCB - OKINAWA CAMP FUTENMA',location:`${state?.settings?.installationCode||'FT'}-${d.building||''}-${d.room||''}`,address:'',stateProvince:'OKINAWA',postalCode:'96372',country:'JAPAN',unitDesignation:'1 BR, 1 BA (<180 NSF)',roomDesignation:'PRIVATE BEDROOM',residentName:'NA',paygrade:'NA',rank:'NA',present:'No',propertyType:'BARRACKS',...(d.formFields||{})};d.readings=d.readings||{temperature:{outdoor:'',unit:'',floor:'',bedroom:'',bathroom:'',comments:''},humidity:{outdoor:'',unit:'',floor:'',bedroom:'',bathroom:'',comments:''},dewPoint:{outdoor:'',unit:'',floor:'',bedroom:'',bathroom:'',comments:''}};return d}
function save(){state.version=APP_VERSION;localStorage.setItem(APP_KEY,JSON.stringify(state))}
function saveDraft(){draft?localStorage.setItem(DRAFT_KEY,JSON.stringify(draft)):localStorage.removeItem(DRAFT_KEY)}
function esc(v=''){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function uid(){return crypto.randomUUID?crypto.randomUUID():'id-'+Date.now()+'-'+Math.random().toString(16).slice(2)}
function today(){return new Date().toISOString().slice(0,10)}
function fmtDate(v){if(!v)return'—';const[y,m,d]=String(v).slice(0,10).split('-');return`${d} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][Number(m)-1]} ${y}`}
function val(id){return document.querySelector('#'+id)?.value.trim()||''}
function setRoute(next){route=next;render();window.scrollTo({top:0,behavior:'smooth'})}
function download(name,blob){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1500)}
function render(){document.querySelectorAll('[data-route]').forEach(b=>b.classList.toggle('active',b.dataset.route===route));app.innerHTML=route==='modules'?modulesView():route==='inspection'?inspectionView():route==='records'?recordsView():route==='quarterly'?quarterlyView():settingsView();bind()}
function settingsList(value){return[...new Set(String(value||'').split(/\r?\n/).map(x=>x.trim()).filter(Boolean))]}
function buildingList(){return settingsList(state.settings.buildings)}
function managerList(){return settingsList(state.settings.buildingManagers)}
function assignmentMap(){const map={};String(state.settings.bmAssignments||'').split(/\r?\n/).forEach(line=>{const [building,...name]=line.split('|');if(building?.trim()&&name.join('|').trim())map[building.trim()]=name.join('|').trim()});return map}
function assignedManager(building){return assignmentMap()[String(building||'').trim()]||state.settings.inspector||''}
function locationCode(building,room){return `${state.settings.installationCode||'FT'}-${String(building||'').trim()}-${String(room||'').trim()}`}
function nextInspectionNumber(dateValue){const ym=String(dateValue||today()).replaceAll('-','').slice(0,6);const nums=[...state.records.map(r=>r.inspectionNumber),draft?.inspectionNumber].filter(Boolean).filter(n=>String(n).startsWith(ym)).map(n=>Number(String(n).slice(6))).filter(Number.isFinite);return ym+String((nums.length?Math.max(...nums):0)+1).padStart(6,'0')}
function gradeOptions(){return USMC_GRADES.map(([g,r])=>`<option value="${esc(g+' — '+r)}"></option>`).join('')}
function applyGradeChoice(inputValue,paygradeEl,rankEl){const raw=String(inputValue||'').trim();const exact=USMC_GRADES.find(([g,r])=>raw===`${g} — ${r}`||raw.toLowerCase()===r.toLowerCase());if(exact){paygradeEl.value=exact[0];rankEl.value=exact[1];return}const digit=raw.match(/(?:^|\D)(10|[1-9])(?:$|\D)/)?.[1]||(/^\d+$/.test(raw)?raw:'');if(digit){const matches=USMC_GRADES.filter(([g])=>g.endsWith('-'+digit));if(matches.length===1){paygradeEl.value=matches[0][0];rankEl.value=matches[0][1]}}}

function ehsTemplate(type){return type==='Command-Directed'?COMMAND_EHS_SECTIONS:EHS_SECTIONS}
function componentTemplate(type){return type==='Command-Directed'?COMMAND_COMPONENT_SECTIONS:COMPONENT_SECTIONS}
function startingDefaultsField(type){return['Check-In','Check-Out'].includes(type)?`<div class="field"><label>Starting responses</label><select id="startDefaults"><option value="normal" selected>Prefill inspection defaults</option><option value="blank">Leave all responses blank</option></select><small>Building 400 starts every component rating at N/A and highlights only the items requiring review.</small></div>`:''}
function officialFieldsStart(){return`<div class="field"><label>Inspection number</label><input id="startInspectionNumber" readonly><small>Generated automatically: YYYYMM + six-digit sequence.</small></div><div class="field"><label>Re-inspection</label><select id="startReinspection"><option value="No">No</option><option value="Yes">Yes</option></select></div><div class="field"><label>Resident present</label><select id="startPresent"><option value="No">No</option><option value="Yes">Yes</option></select></div><div class="field"><label>Resident name</label><input id="startResidentName" value="NA"></div><div class="field"><label>Paygrade / Rank quick entry</label><input id="startGradeQuick" list="gradeRankList" placeholder="Type 4 for E-4 / W-4 / O-4"><datalist id="gradeRankList">${gradeOptions()}</datalist><small>Type the grade number to narrow the list, then tap the correct grade/rank.</small></div><div class="field"><label>Paygrade</label><input id="startPaygrade" value="NA" readonly></div><div class="field"><label>Rank</label><input id="startRank" value="NA" readonly></div><div class="field"><label>Location</label><input id="startLocation" readonly placeholder="FT-BUILDING-ROOM"></div><div class="field"><label>Address</label><input id="startAddress" value="400 HERCULES LANE, 96372"></div><div class="field"><label>Unit designation</label><input id="startUnitDesignation" value="1 BR, 1 BA (&lt;180 NSF)"></div><div class="field"><label>Room designation</label><input id="startRoomDesignation" value="PRIVATE BEDROOM"></div>`}
function isBuilding400(building){return String(building||'').trim().replace(/^building\s*/i,'').replace(/^bldg\.?\s*/i,'')==='400'}
function isBuilding400ReviewItem(r){return isBuilding400(draft?.building)&&(BUILDING_400_COMPONENTS[r.section]||[]).includes(r.item)}
function applyStartingDefaults(mode){
  if(mode!=='normal'||!['Check-In','Check-Out'].includes(draft.type))return;
  const b400=isBuilding400(draft.building);
  draft.ehsResponses.forEach(r=>{
    const unavailable=b400&&/Carbon Monoxide Detectors|fire sprinkler/i.test(r.item);
    r.answer=unavailable&&r.choices.includes('N/A')?'N/A':'Yes';
  });
  draft.componentResponses.forEach(r=>{
    r.rating=b400?'N/A':'G';
  });
}

function modulesView(){const pending=state.records.filter(r=>!r.emhUpdated).length;return`<div class="page-head"><div><h2>Field Modules</h2><p>Compact forms for field use and later eMH entry.</p></div></div>${!state.settings.acknowledged?`<div class="notice danger"><b>Draft supplement only.</b> Records and signatures remain in this browser until exported. <button class="button compact outline" data-action="acknowledge">Acknowledge</button></div><br>`:''}<div class="grid"><div class="card half module-card active-module"><div class="module-icon">⇥</div><div><h2>Check-In</h2><p class="muted">Pre-occupancy room-condition inspection before eMH check-in.</p></div><button class="button" data-action="start-type" data-id="Check-In">New Check-In</button></div><div class="card half module-card active-module"><div class="module-icon">⇤</div><div><h2>Check-Out</h2><p class="muted">Room-condition inspection for termination and turnover.</p></div><button class="button" data-action="start-type" data-id="Check-Out">New Check-Out</button></div><div class="card half module-card active-module"><div class="module-icon">▤</div><div><h2>Furniture Issued Items</h2><p class="muted">Quantity and condition verification for 1, 2, or 3 occupants.</p></div><button class="button" data-action="start-type" data-id="Furniture-Issued">New Furniture Record</button></div><div class="card half module-card active-module"><div class="module-icon">△</div><div><h2>Command-Directed</h2><p class="muted">Expanded checklist, environmental readings, building systems, and room components.</p></div><button class="button" data-action="start-type" data-id="Command-Directed">New Command Inspection</button></div><div class="card half module-card active-module"><div class="module-icon">◫</div><div><h2>Quarterly Inspection</h2><p class="muted">Fast 20% / 100% room and common-space inspections with milestone tracking.</p></div><button class="button" data-action="open-quarterly">Open Quarterly</button></div><div class="card"><h3>Transfer Status</h3><div class="record"><span>Completed records</span><b>${state.records.length}</b></div><div class="record"><span>Awaiting eMH update</span><b>${pending}</b></div></div></div>`}
function inspectionView(){if(draft)return editorView();return`<div class="page-head"><div><h2>Inspection Forms</h2><p>Select the form to begin.</p></div></div><div class="grid"><button class="card choice-card" data-action="start-type" data-id="Check-In"><b>Check-In</b><span>Pre-occupancy readiness</span></button><button class="card choice-card" data-action="start-type" data-id="Check-Out"><b>Check-Out</b><span>Termination and turnover</span></button><button class="card choice-card" data-action="start-type" data-id="Furniture-Issued"><b>Furniture Issued Items</b><span>Separate inventory verification</span></button><button class="card choice-card" data-action="start-type" data-id="Command-Directed"><b>Command-Directed</b><span>Expanded eMH inspection</span></button><button class="card choice-card" data-action="open-quarterly"><b>Quarterly Inspection</b><span>20% / 100% fast inspection</span></button></div>`}
function startView(type){const buildings=buildingList(),managers=managerList(),isFurniture=type==='Furniture-Issued';return`<div class="page-head"><div><h2>${type==='Furniture-Issued'?'Furniture Issued Items':type+' Inspection'}</h2><p>Enter the room information, then begin the form.</p></div><button class="button compact outline" data-action="close-start">Cancel</button></div><form id="startForm" class="card form-grid"><input id="inspectionType" type="hidden" value="${type}"><div class="field"><label>Date *</label><input id="startDate" type="date" value="${today()}" required></div><div class="field"><label>Building Manager / Housing Rep *</label><input id="startInspector" list="managerList" value="${esc(state.settings.inspector)}" required><datalist id="managerList">${managers.map(x=>`<option value="${esc(x)}">`).join('')}</datalist></div><div class="field"><label>Building number *</label><input id="startBuilding" list="buildingList" required><datalist id="buildingList">${buildings.map(x=>`<option value="${esc(x)}">`).join('')}</datalist></div><div class="field"><label>Room number *</label><input id="startRoom" required></div>${isFurniture?`<div class="field"><label>Furniture sets / occupants *</label><select id="startOccupants" required><option value="1">1</option><option value="2" selected>2</option><option value="3">3</option></select></div>`:'<input id="startOccupants" type="hidden" value="1">'}${startingDefaultsField(type)}${officialFieldsStart()}<div class="field"><label>Inspection basis</label><select id="startBasis"><option>Physical room inspection</option><option>Previous inspection plus verification walk</option></select></div><div class="field full"><button class="button full" type="submit">Begin ${type==='Furniture-Issued'?'Furniture Record':type}</button></div></form>`}
function inspectionLabel(type){return type==='Check-Out'?'CHECK-OUT/TERMINATION':type==='Command-Directed'?'COMMAND DIRECTED':type==='Furniture-Issued'?'FURNITURE ISSUED ITEMS':'CHECK-IN'}
function editorView(){const isFurniture=draft.type==='Furniture-Issued',answered=draft.ehsResponses.filter(r=>r.answer).length,componentsDone=draft.componentResponses.filter(r=>r.rating).length,reviewed=draft.furniture.filter(f=>f.rating&&f.present!=='').length,total=isFurniture?draft.furniture.length:draft.ehsResponses.length+draft.componentResponses.length,pct=total?Math.round((isFurniture?reviewed:answered+componentsDone)/total*100):0,completionLabel=draft.editingRecordId?'Save Changes':'Complete';return`<div class="page-head compact-head"><div><span class="badge">${esc(draft.type.toUpperCase())}</span><h2>Building ${esc(draft.building)} · Room ${esc(draft.room)}</h2><p>${fmtDate(draft.date)}${isFurniture?` · ${draft.occupants} furniture set${draft.occupants===1?'':'s'}`:''}</p></div><button class="button compact outline" data-action="cancel-draft">Cancel</button></div><div class="inspection-toolbar"><div class="card compact-toolbar"><span class="badge">${pct}% REVIEWED</span><div class="actions">${isFurniture?'':`<button class="button compact secondary" data-action="all-yes">All Blank Yes</button><button class="button compact secondary" data-action="components-good">Components Good</button>`}${isFurniture?`<button class="button compact secondary" data-action="inventory-good">Furniture Good</button>`:''}<button class="button compact success" data-action="complete">${esc(completionLabel)}</button></div><div class="progress"><i style="width:${pct}%"></i></div></div></div><div class="paper-form"><div class="paper-title"><b>${isFurniture?'Furniture Issued Items':'Unaccompanied Housing Inspection Checklist'}</b><span>${inspectionLabel(draft.type)} · MCB Camp S. D. Butler · MCAS Futenma</span></div><div class="paper-meta"><span><b>Date</b>${fmtDate(draft.date)}</span><span><b>Building</b>${esc(draft.building)}</span><span><b>Room</b>${esc(draft.room)}</span><span><b>Building Manager / Housing Rep</b>${esc(draft.inspector)}</span>${draft.inspectionNumber?`<span><b>Inspection Number</b>${esc(draft.inspectionNumber)}</span>`:''}<span><b>Re-inspection</b>${esc(draft.reinspection||'No')}</span></div>${officialFieldsEditor()}${signaturePadsView()}${isFurniture?`${ratingLegend()}${furnitureTable()}`:`${ehsChecklist()}${ratingLegend()}${componentChecklist()}${followUpView()}`}<div class="overall-box"><label>${isFurniture?'Furniture Comments':'Inspection Comments'}</label><textarea id="overallNotes">${esc(draft.overallNotes||'')}</textarea></div><div class="paper-actions"><button class="button success" data-action="complete">${esc(completionLabel)}</button></div></div>`}
function officialFieldsEditor(){const f=draft.formFields||{};return`<section class="official-fields"><div class="form-section-title">Official PDF Fields</div><div class="form-grid official-field-grid"><div class="field"><label>Resident name</label><input data-form-field="residentName" value="${esc(f.residentName||'')}"></div><div class="field"><label>Resident present</label><select data-form-field="present"><option value="No" ${f.present==='No'?'selected':''}>No</option><option value="Yes" ${f.present==='Yes'?'selected':''}>Yes</option></select></div><div class="field"><label>Paygrade</label><input data-form-field="paygrade" value="${esc(f.paygrade||'')}" readonly></div><div class="field"><label>Rank</label><input data-form-field="rank" value="${esc(f.rank||'')}" readonly></div><div class="field"><label>Location</label><input data-form-field="location" value="${esc(f.location||'')}"></div><div class="field"><label>Address</label><input data-form-field="address" value="${esc(f.address||'')}"></div><div class="field"><label>Unit designation</label><input data-form-field="unitDesignation" value="${esc(f.unitDesignation||'')}"></div><div class="field"><label>Room designation</label><input data-form-field="roomDesignation" value="${esc(f.roomDesignation||'')}"></div></div></section>`}
function signaturePadsView(){return`<section class="signature-section"><div class="signature-box"><div class="signature-label"><b>Building Manager / Housing Rep Signature</b><button class="signature-clear" data-clear-signature="housingRep" type="button">Clear</button></div><canvas data-signature="housingRep" width="600" height="120" aria-label="Building Manager signature pad"></canvas></div><div class="signature-box"><div class="signature-label"><b>Resident Signature (if applicable)</b><button class="signature-clear" data-clear-signature="resident" type="button">Clear</button></div><canvas data-signature="resident" width="600" height="120" aria-label="Resident signature pad"></canvas></div></section>`}
function commandReadingsView(){const labels=[['temperature','Temperature (T) 68-80°F'],['humidity','Relative Humidity (RH) 30-50%'],['dewPoint','Dew Point']],locations=[['outdoor','Outdoor'],['unit','Unit'],['floor','Floor Outside Unit'],['bedroom','Bedroom'],['bathroom','Bathroom']];return`<div class="readings-block"><div class="readings-subtitle">Measurements and Readings</div><div class="compact-table-wrap"><table class="paper-table readings-table"><thead><tr><th>Reading</th>${locations.map(x=>`<th>${x[1]}</th>`).join('')}<th>Comments</th></tr></thead><tbody>${labels.map(([key,label])=>`<tr><td>${label}</td>${locations.map(([loc])=>`<td><input data-reading="${key}" data-reading-location="${loc}" type="number" step="0.1" value="${esc(draft.readings?.[key]?.[loc]||'')}" ${key==='dewPoint'?'readonly':''}></td>`).join('')}<td><input data-reading="${key}" data-reading-location="comments" value="${esc(draft.readings?.[key]?.comments||'')}"></td></tr>`).join('')}</tbody></table></div></div>`}
function ehsChecklist(){return ehsTemplate(draft.type).map(s=>{const rows=draft.ehsResponses.filter(r=>r.section===s.name),columns=['Yes','No',...(['Unknown','N/A'].filter(v=>rows.some(r=>r.choices.includes(v))))];return`<section class="form-section"><div class="form-section-title">${esc(s.name)}</div>${draft.type==='Command-Directed'&&s.name==='Mold/Moisture Control'?commandReadingsView():''}<table class="paper-table ehs-table"><colgroup>${columns.map(()=>'<col class="mark-col">').join('')}<col></colgroup><thead><tr>${columns.map(v=>`<th>${v==='Unknown'?'UNK':v}</th>`).join('')}<th>Question</th></tr></thead><tbody>${rows.map(r=>ehsRow(r,columns)).join('')}</tbody></table>${draft.type==='Command-Directed'&&s.name.startsWith('Smoke and Carbon')?`<label class="inline-extra">Date of latest Fire Alarm Control System Inspection:<input data-extra-field="fireAlarmInspectionDate" type="date" value="${esc(draft.extraFields?.fireAlarmInspectionDate||'')}"></label>`:''}<label class="section-comments">If you answered “No” to any question above, provide details:<textarea data-section-comment="${esc(s.name)}">${esc(draft.sectionComments[s.name]||'')}</textarea></label></section>`}).join('')}
function ehsRow(r,columns){return`<tr data-ehs-id="${r.id}" class="${r.answer==='No'?'deficient-row':''}">${columns.map(v=>`<td class="mark-cell">${r.choices.includes(v)?`<label class="square-choice" aria-label="${esc(v)}"><input type="radio" name="e-${r.id}" value="${v}" ${r.answer===v?'checked':''}><span>${r.answer===v?'●':''}</span></label>`:'<span class="not-rated">—</span>'}</td>`).join('')}<td>${esc(r.item)}</td></tr>`}
function ratingOptions(value){return RATINGS.map(([v,label])=>`<option value="${v}" ${value===v?'selected':''}>${label}</option>`).join('')}
function conditionOptions(value){return CONDITION_CODES.map(([v,label])=>`<option value="${v}" ${value===v?'selected':''}>${label}</option>`).join('')}
function ratingLegend(){return`<div class="rating-legend"><b>Component Rating</b><span><strong>G</strong> Good</span><span><strong>F</strong> Fair</span><span><strong>P</strong> Poor</span><span><strong>EHS</strong> Environmental, Health, Safety</span><span><strong>N/A</strong> Not Applicable</span></div>`}
function componentChecklist(){return componentTemplate(draft.type).map(s=>{const rows=draft.componentResponses.filter(r=>r.section===s.name),na=draft.componentSectionNA[s.name];return`<section class="form-section"><div class="form-section-title">${esc(s.name)}</div><label class="section-na"><input type="checkbox" data-component-na="${esc(s.name)}" ${na?'checked':''}> Mark section as N/A</label><div class="compact-table-wrap"><table class="paper-table component-table"><colgroup><col class="component-col"><col class="rating-col"><col class="code-col"><col></colgroup><thead><tr><th>Component</th><th>Rating</th><th>Condition</th><th>Comments</th></tr></thead><tbody>${rows.map(componentRow).join('')}</tbody></table></div></section>`}).join('')}
function componentRow(r){const review=isBuilding400ReviewItem(r);return`<tr data-component-id="${r.id}" class="${['P','EHS'].includes(r.rating)?'deficient-row ':''}${review?'review-row':''}"><td>${esc(r.item)}</td><td><select data-component-field="rating">${ratingOptions(r.rating)}</select></td><td><select data-component-field="condition">${conditionOptions(r.condition)}</select></td><td><input data-component-field="comments" value="${esc(r.comments||'')}" placeholder="Comments"></td></tr>`}
function furnitureDeficient(f){return(f.present!==''&&f.present<f.expected)||['P','EHS'].includes(f.rating)||['BR','MI','R'].includes(f.condition)}
function furnitureTable(){return`<section class="form-section"><div class="form-section-title">Furniture / Issued Items</div><div class="compact-table-wrap"><table class="paper-table furniture-table"><colgroup><col class="f-item"><col class="f-qty"><col class="f-qty"><col class="rating-col"><col class="code-col"><col></colgroup><thead><tr><th>Item</th><th>Expected</th><th>Present</th><th>Rating</th><th>Condition</th><th>Comments</th></tr></thead><tbody>${draft.furniture.map(f=>`<tr data-furniture-id="${f.id}" class="${furnitureDeficient(f)?'deficient-row':''}"><td>${esc(f.item)}<small>${f.mode==='perMarine'?'per Marine':f.mode==='perRoom'?'per room':'adjustable'}</small></td><td><input data-furniture-field="expected" type="number" min="0" value="${f.expected}"></td><td><input data-furniture-field="present" type="number" min="0" value="${f.present}"></td><td><select data-furniture-field="rating">${ratingOptions(f.rating)}</select></td><td><select data-furniture-field="condition">${conditionOptions(f.condition)}</select></td><td><input data-furniture-field="comments" value="${esc(f.comments||'')}" placeholder="Comments"></td></tr>`).join('')}</tbody></table></div></section>`}
function followUpView(){const options=['None','Re-Inspection Required','Work Request Required','In-House Maintenance','EHS - General Safety',...(draft.type==='Command-Directed'?['EHS - Asbestos','EHS - Radon']:[]),'EHS - Water','EHS - Mold/Moisture Control','EHS - HVAC','EHS - Pest Management','EHS - Smoke and Carbon Monoxide Detectors and Fire Sprinklers'];return`<section class="form-section"><div class="form-section-title">Follow-up Actions</div><div class="follow-grid">${options.map(x=>`<label><input type="checkbox" data-follow-up="${esc(x)}" ${draft.followUp.includes(x)?'checked':''}> ${esc(x)}</label>`).join('')}</div><div class="calculated-result"><b>Calculated inspection result</b><span>${esc(outcomeFor(draft))}</span></div></section>`}
function recordsView(){const records=state.records.slice().sort((a,b)=>String(b.completedAt).localeCompare(String(a.completedAt)));ensureRangeDefaults(records);const count=rangeRecords().length;return`<div class="page-head"><div><h2>Inspection Records</h2><p>${records.length} completed</p></div><div class="actions"><button class="button compact" data-action="export-all">Export All Excel</button><button class="button compact secondary" data-action="backup">Backup</button></div></div><div class="card range-export"><h3>Export by Inspection Date</h3><div class="form-grid"><div class="field"><label>From</label><input id="rangeFrom" type="date" value="${esc(rangeFrom)}"></div><div class="field"><label>Through</label><input id="rangeTo" type="date" value="${esc(rangeTo)}"></div></div><p class="small muted" id="rangeCount">${count} record${count===1?'':'s'} selected</p><div class="actions"><button class="button" data-action="export-range-pdf">Export Combined PDF</button><button class="button secondary" data-action="export-range-excel">Export Excel</button></div></div><div class="card">${records.length?records.map(recordRow).join(''):'<div class="empty">No completed inspections.</div>'}</div>`}
function ensureRangeDefaults(records){if(!records.length)return;const dates=records.map(r=>String(r.date||'').slice(0,10)).filter(Boolean).sort();if(!rangeFrom)rangeFrom=dates[0]||'';if(!rangeTo)rangeTo=dates.at(-1)||''}
function rangeRecords(){return state.records.filter(r=>(!rangeFrom||String(r.date||'')>=rangeFrom)&&(!rangeTo||String(r.date||'')<=rangeTo)).sort((a,b)=>String(a.date||'').localeCompare(String(b.date||''))||String(a.completedAt||'').localeCompare(String(b.completedAt||'')))}
function bindRangeControls(){const from=document.querySelector('#rangeFrom'),to=document.querySelector('#rangeTo'),count=document.querySelector('#rangeCount');if(!from||!to)return;const update=()=>{rangeFrom=from.value;rangeTo=to.value;const total=rangeRecords().length;if(count)count.textContent=`${total} record${total===1?'':'s'} selected`};from.oninput=update;to.oninput=update}
function recordRow(r){const fail=r.outcome==='Fail'||/Hold|Not Ready|Not Clear/.test(r.outcome),condition=/Condition|Discrepancies/.test(r.outcome);return`<div class="record"><div><div class="record-title">${esc(r.type)} · Building ${esc(r.building)} · Room ${esc(r.room)}</div><div class="record-meta">${fmtDate(r.date)} · ${esc(r.inspector)}</div><div class="actions"><span class="badge ${fail?'fail':condition?'pending':'pass'}">${esc(r.outcome)}</span><span class="badge ${r.emhUpdated?'pass':'pending'}">eMH ${r.emhUpdated?'UPDATED':'PENDING'}</span></div></div><button class="button compact outline" data-action="open-record" data-id="${r.id}">Open</button></div>`}
function settingsView(){return`<div class="page-head"><div><h2>Settings</h2><p>Defaults, buildings, Building Managers, assignments, and local data.</p></div></div><div class="stack"><form id="settingsForm" class="card form-grid"><div class="field"><label>Installation</label><input id="setInstallation" value="${esc(state.settings.installation)}"></div><div class="field"><label>Installation code</label><input id="setInstallationCode" value="${esc(state.settings.installationCode||'FT')}" maxlength="4"></div><div class="field"><label>Default Building Manager / Housing Rep</label><input id="setInspector" value="${esc(state.settings.inspector)}"></div><div class="field"><label>Building numbers</label><textarea id="setBuildings" class="roster-input">${esc(state.settings.buildings||'')}</textarea><p class="small muted">One building per line.</p></div><div class="field"><label>Building Managers</label><textarea id="setBuildingManagers" class="roster-input">${esc(state.settings.buildingManagers||'')}</textarea><p class="small muted">One name per line. Inspecting BM can always be overridden on an inspection.</p></div><div class="field full"><label>Default BM assignments</label><textarea id="setBmAssignments" class="roster-input" placeholder="400|David Silvaloaso">${esc(state.settings.bmAssignments||DEFAULT_BM_ASSIGNMENTS)}</textarea><p class="small muted">Format: Building|Building Manager. This controls only the default; it does not prevent another BM from conducting the inspection.</p></div><div class="field full"><button class="button" type="submit">Save Settings</button></div></form><div class="card"><h3>App Update</h3><p class="small muted">Installed version: <b>${esc(APP_VERSION)}</b>.</p><button class="button secondary" data-action="check-update">Check for Update</button></div><div class="card"><h3>Local Data</h3><p class="small muted">Drafts, completed records, and signatures stay in this browser. Export before clearing browser data or changing devices.</p><div class="actions"><button class="button" data-action="export-all">Export Excel</button><button class="button secondary" data-action="backup">Export JSON Backup</button><label class="button outline" style="cursor:pointer">Import JSON Backup<input id="restoreBackup" type="file" accept="application/json,.json" hidden></label><button class="button danger" data-action="clear-data">Erase All Data</button></div></div></div>`}
function bind(){document.querySelectorAll('[data-route]').forEach(b=>b.onclick=()=>setRoute(b.dataset.route));document.querySelectorAll('[data-action]').forEach(b=>b.onclick=e=>{e.preventDefault();action(b.dataset.action,b.dataset.id)});bindRangeControls();const start=document.querySelector('#startForm');if(start)start.onsubmit=e=>{e.preventDefault();beginInspection()};const settings=document.querySelector('#settingsForm');if(settings)settings.onsubmit=e=>{e.preventDefault();state.settings.installation=val('setInstallation');state.settings.installationCode=(val('setInstallationCode')||'FT').toUpperCase();state.settings.inspector=val('setInspector');state.settings.buildings=document.querySelector('#setBuildings')?.value.trim()||'';state.settings.buildingManagers=document.querySelector('#setBuildingManagers')?.value.trim()||'';state.settings.bmAssignments=document.querySelector('#setBmAssignments')?.value.trim()||'';save();showDialog('Settings saved','Building Manager defaults and assignments updated.');render()};const sb=document.querySelector('#startBuilding'),sr=document.querySelector('#startRoom'),sd=document.querySelector('#startDate'),si=document.querySelector('#startInspector'),sl=document.querySelector('#startLocation'),sn=document.querySelector('#startInspectionNumber'),sq=document.querySelector('#startGradeQuick'),sp=document.querySelector('#startPaygrade'),sk=document.querySelector('#startRank');const refreshStart=()=>{if(sb&&si){const bm=assignedManager(sb.value);if(bm)si.value=bm}if(sl&&sb&&sr)sl.value=locationCode(sb.value,sr.value);if(sn&&sd)sn.value=nextInspectionNumber(sd.value)};if(sb)sb.addEventListener('change',refreshStart);if(sr)sr.addEventListener('input',()=>{if(sl)sl.value=locationCode(sb?.value,sr.value)});if(sd)sd.addEventListener('change',refreshStart);if(sq)sq.addEventListener('input',()=>applyGradeChoice(sq.value,sp,sk));refreshStart();const rb=document.querySelector('#restoreBackup');if(rb)rb.onchange=e=>restoreFullBackup(e.target.files?.[0]);bindQuarterly();if(!draft)return;document.querySelectorAll('[data-ehs-id]').forEach(row=>row.querySelectorAll('input[type="radio"]').forEach(i=>i.onchange=()=>{draft.ehsResponses.find(x=>x.id===row.dataset.ehsId).answer=i.value;saveDraft();render()}));document.querySelectorAll('[data-section-comment]').forEach(f=>f.oninput=()=>{draft.sectionComments[f.dataset.sectionComment]=f.value;saveDraft()});document.querySelectorAll('[data-component-id]').forEach(row=>row.querySelectorAll('[data-component-field]').forEach(f=>f.onchange=()=>{const item=draft.componentResponses.find(x=>x.id===row.dataset.componentId);item[f.dataset.componentField]=f.value;if(f.dataset.componentField==='rating'&&f.value!=='N/A')draft.componentSectionNA[item.section]=false;saveDraft();render()}));document.querySelectorAll('[data-component-na]').forEach(f=>f.onchange=()=>{draft.componentSectionNA[f.dataset.componentNa]=f.checked;if(f.checked)draft.componentResponses.filter(x=>x.section===f.dataset.componentNa).forEach(x=>{x.rating='N/A'});saveDraft();render()});document.querySelectorAll('[data-furniture-id]').forEach(row=>row.querySelectorAll('[data-furniture-field]').forEach(f=>f.onchange=()=>{const item=draft.furniture.find(x=>x.id===row.dataset.furnitureId);item[f.dataset.furnitureField]=f.type==='number'?(f.value===''?'':Math.max(0,Number(f.value)||0)):f.value;saveDraft();render()}));document.querySelectorAll('[data-reading]').forEach(f=>f.onchange=()=>{draft.readings[f.dataset.reading][f.dataset.readingLocation]=f.value;if(['temperature','humidity'].includes(f.dataset.reading))calcReadings();saveDraft();render()});document.querySelectorAll('[data-extra-field]').forEach(f=>f.onchange=()=>{draft.extraFields[f.dataset.extraField]=f.value;saveDraft()});document.querySelectorAll('[data-form-field]').forEach(f=>f.onchange=()=>{draft.formFields[f.dataset.formField]=f.value;saveDraft()});document.querySelectorAll('[data-follow-up]').forEach(f=>f.onchange=()=>{draft.followUp=f.checked?[...new Set([...draft.followUp,f.dataset.followUp])]:draft.followUp.filter(x=>x!==f.dataset.followUp);saveDraft()});bindSignaturePads();const overall=document.querySelector('#overallNotes');if(overall)overall.oninput=()=>{draft.overallNotes=overall.value;saveDraft()}}
function bindSignaturePads(){document.querySelectorAll('[data-signature]').forEach(canvas=>{const key=canvas.dataset.signature,ctx=canvas.getContext('2d');ctx.lineWidth=2.2;ctx.lineCap='round';ctx.strokeStyle='#17202a';if(draft.signatures[key]){const img=new Image();img.onload=()=>ctx.drawImage(img,0,0,canvas.width,canvas.height);img.src=draft.signatures[key]}let drawing=false;const point=e=>{const r=canvas.getBoundingClientRect(),p=e.touches?.[0]||e;return{x:(p.clientX-r.left)*(canvas.width/r.width),y:(p.clientY-r.top)*(canvas.height/r.height)}};const start=e=>{e.preventDefault();drawing=true;const p=point(e);ctx.beginPath();ctx.moveTo(p.x,p.y)};const move=e=>{if(!drawing)return;e.preventDefault();const p=point(e);ctx.lineTo(p.x,p.y);ctx.stroke()};const end=e=>{if(!drawing)return;e.preventDefault();drawing=false;draft.signatures[key]=canvas.toDataURL('image/png');saveDraft()};canvas.addEventListener('pointerdown',start);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',end);canvas.addEventListener('pointerleave',end)});document.querySelectorAll('[data-clear-signature]').forEach(b=>b.onclick=()=>{draft.signatures[b.dataset.clearSignature]='';saveDraft();render()})}
function action(name,id){if(name==='acknowledge'){state.settings.acknowledged=true;save();render()}if(name==='start-type'){pendingType=id;app.innerHTML=startView(id);bind()}if(name==='close-start'){route='inspection';render()}if(name==='cancel-draft'&&confirm('Discard this unfinished inspection?')){draft=null;saveDraft();render()}if(name==='all-yes'){draft.ehsResponses.forEach(r=>{if(!r.answer)r.answer='Yes'});saveDraft();render()}if(name==='components-good'){draft.componentResponses.forEach(r=>{if(!r.rating)r.rating='G'});saveDraft();render()}if(name==='inventory-good'){draft.furniture.forEach(f=>{f.present=f.expected;f.rating='G'});saveDraft();render()}if(name==='complete')completeInspection();if(name==='open-record')openRecord(id);if(name==='export-all')exportExcel(state.records);if(name==='export-range-excel')exportRangeExcel();if(name==='export-range-pdf')exportRangePdf();if(name==='backup')exportFullBackup();if(name==='open-quarterly'){route='quarterly';render();}if(name==='check-update')checkForUpdate();if(name==='clear-data')clearData()}
async function checkForUpdate(){try{const reg=await navigator.serviceWorker?.getRegistration();if(reg)await reg.update()}catch{}const url=new URL(window.location.href);url.searchParams.set('app-version',APP_VERSION);window.location.replace(url.toString())}
function beginInspection(){const type=val('inspectionType')||pendingType,building=val('startBuilding'),room=val('startRoom'),occupants=Math.max(1,Math.min(3,Number(val('startOccupants'))||1)),prefix=type==='Check-In'?'CI':type==='Check-Out'?'CO':type==='Furniture-Issued'?'FI':'CD';if(!building||!room||!val('startInspector'))return;draft={id:uid(),recordNumber:`${prefix}-${building.replace(/\W/g,'')}-${room.replace(/\W/g,'')}-${today().replaceAll('-','')}-${String(Date.now()).slice(-4)}`,type,date:val('startDate'),building,room,occupants,inspector:val('startInspector'),basis:val('startBasis'),inspectionNumber:val('startInspectionNumber')||nextInspectionNumber(val('startDate')),reinspection:val('startReinspection')||'No',createdAt:new Date().toISOString(),completedAt:'',emhUpdated:false,overallNotes:'',sectionComments:{},componentSectionNA:{},followUp:[],signatures:{housingRep:'',resident:''},extraFields:{fireAlarmInspectionDate:''},formFields:{installation:state.settings.installation||'CAMP BUTLER MCB - OKINAWA CAMP FUTENMA',location:locationCode(building,room),address:val('startAddress'),stateProvince:'OKINAWA',postalCode:'96372',country:'JAPAN',unitDesignation:val('startUnitDesignation')||'1 BR, 1 BA (<180 NSF)',roomDesignation:val('startRoomDesignation')||'PRIVATE BEDROOM',residentName:val('startResidentName')||'NA',paygrade:val('startPaygrade')||'NA',rank:val('startRank')||'NA',present:val('startPresent')||'No',propertyType:'BARRACKS'},readings:{temperature:{outdoor:'',unit:'',floor:'',bedroom:'',bathroom:'',comments:''},humidity:{outdoor:'',unit:'',floor:'',bedroom:'',bathroom:'',comments:''},dewPoint:{outdoor:'',unit:'',floor:'',bedroom:'',bathroom:'',comments:''}},ehsResponses:[],componentResponses:[],furniture:[]};if(type==='Furniture-Issued'){draft.furniture=FURNITURE.map(f=>({id:uid(),item:f.item,mode:f.mode,expected:f.mode==='perMarine'?f.qty*occupants:f.qty,present:'',rating:'',condition:'',comments:''}))}else{ehsTemplate(type).forEach(s=>{draft.sectionComments[s.name]='';s.items.forEach(([item,extras])=>{const choices=['Yes','No',...(Array.isArray(extras)?extras:(extras?['N/A']:[]))];draft.ehsResponses.push({id:uid(),section:s.name,item,choices:[...new Set(choices)],answer:''})})});componentTemplate(type).forEach(s=>{draft.componentSectionNA[s.name]=false;s.items.forEach(item=>draft.componentResponses.push({id:uid(),section:s.name,item,rating:'',condition:'',comments:''}))})}applyStartingDefaults(val('startDefaults'));saveDraft();route='inspection';render()}
function calcReadings(){for(const loc of ['outdoor','unit','floor','bedroom','bathroom']){const t=Number(draft.readings.temperature[loc]),rh=Number(draft.readings.humidity[loc]);draft.readings.dewPoint[loc]=draft.readings.temperature[loc]!==''&&draft.readings.humidity[loc]!==''&&Number.isFinite(t)&&Number.isFinite(rh)?(t-(9/25)*(100-rh)).toFixed(1):''}}
function outcomeFor(r){if(r.type==='Furniture-Issued')return r.furniture.some(f=>furnitureDeficient(f))?'Complete with Discrepancies':'Complete';const ehsFail=r.ehsResponses.some(x=>x.answer==='No')||r.componentResponses.some(x=>x.rating==='EHS');if(ehsFail)return'Fail';const componentIssue=r.componentResponses.some(x=>['F','P'].includes(x.rating)||x.condition);if(componentIssue)return'Pass with Condition';return'Pass'}
function completeInspection(){const isFurniture=draft.type==='Furniture-Issued',unanswered=draft.ehsResponses.filter(r=>!r.answer);if(unanswered.length)return showDialog('Checklist incomplete',`${unanswered.length} checklist item${unanswered.length===1?' is':'s are'} unanswered.`);const unrated=draft.componentResponses.filter(r=>!draft.componentSectionNA[r.section]&&!r.rating);if(unrated.length)return showDialog('Component ratings incomplete',`${unrated.length} component${unrated.length===1?' needs':'s need'} a rating.`);const unreviewed=isFurniture?draft.furniture.filter(f=>f.present===''||!f.rating):[];if(unreviewed.length)return showDialog('Furniture incomplete',`${unreviewed.length} furniture item${unreviewed.length===1?' needs':'s need'} a present quantity and rating.`);const missingSectionNotes=ehsTemplate(draft.type).filter(s=>draft.ehsResponses.some(r=>r.section===s.name&&r.answer==='No')&&!String(draft.sectionComments[s.name]||'').trim());if(missingSectionNotes.length)return showDialog('Section details required',`Add details for: ${missingSectionNotes.map(s=>s.name).join(', ')}.`);const missingComments=[...draft.componentResponses.filter(r=>(['P','EHS'].includes(r.rating)||r.condition)&&!r.comments.trim()),...(isFurniture?draft.furniture.filter(f=>furnitureDeficient(f)&&!f.comments.trim()):[])];if(missingComments.length)return showDialog('Comments required',`${missingComments.length} deficient item${missingComments.length===1?' needs':'s need'} a comment.`);const now=new Date().toISOString(),editingId=draft.editingRecordId||'';draft.outcome=outcomeFor(draft);if(editingId){const index=state.records.findIndex(x=>x.id===editingId);if(index<0)return showDialog('Record not found','The completed inspection could not be updated.');draft.completedAt=draft.completedAt||now;draft.updatedAt=now;const saved=structuredClone(draft);delete saved.editingRecordId;state.records[index]=saved}else{draft.completedAt=now;state.records.unshift(structuredClone(draft))}save();const id=draft.id;draft=null;saveDraft();route='records';render();openRecord(id)}
function editRecord(id){const r=state.records.find(x=>x.id===id);if(!r)return;draft=normalizeDraft(structuredClone(r));draft.editingRecordId=r.id;saveDraft();closeDialog();route='inspection';render();window.scrollTo({top:0,behavior:'smooth'})}
function openRecord(id){const r=state.records.find(x=>x.id===id);if(!r)return;const deficiencies=[...(r.ehsResponses||[]).filter(x=>x.answer==='No').map(x=>`${x.section}: ${x.item} - ${r.sectionComments?.[x.section]||''}`),...(r.componentResponses||[]).filter(x=>['P','EHS'].includes(x.rating)||x.condition).map(x=>`${x.section}: ${x.item} - ${x.rating}${x.condition?' / '+x.condition:''} - ${x.comments}`),...(r.furniture||[]).filter(f=>furnitureDeficient(f)).map(f=>`${f.item}: expected ${f.expected}, present ${f.present}, ${f.rating}${f.condition?' / '+f.condition:''} - ${f.comments}`)];showDialog(`${esc(r.type)} · Bldg ${esc(r.building)} · Room ${esc(r.room)}`,`<div class="stack"><div class="notice"><b>${esc(r.outcome)}</b><div class="small">${esc(r.recordNumber)}</div></div><div class="small"><b>Date:</b> ${fmtDate(r.date)}<br><b>Building Manager:</b> ${esc(r.inspector)}<br><b>BM signature:</b> ${r.signatures?.housingRep?'Captured':'Not captured'}<br><b>Resident signature:</b> ${r.signatures?.resident?'Captured':'Not captured'}<br><b>eMH:</b> ${r.emhUpdated?'Updated':'Pending manual entry'}</div>${deficiencies.length?`<div><h3>Deficiencies</h3>${deficiencies.map(x=>`<div class="notice warn record-note">${esc(x)}</div>`).join('')}</div>`:'<div class="notice">No deficiencies recorded.</div>'}${r.type==='Check-In'?'<div class="notice"><b>15-Day QSRMax Notice</b><div class="small">The Marine should report pre-existing discrepancies or repairs through QSRMax within 15 days of occupancy.</div></div>':''}<div class="actions"><button class="button" id="editInspection">Edit</button><button class="button secondary" id="exportPdf">Export PDF</button><button class="button" id="toggleEmh">${r.emhUpdated?'Mark eMH Pending':'Mark eMH Updated'}</button><button class="button secondary" id="exportOne">Export Excel</button><button class="button outline" id="closeRecord">Close</button><button class="button danger" id="deleteRecord">Delete</button></div></div>`);document.querySelector('#editInspection').onclick=()=>editRecord(id);document.querySelector('#exportPdf').onclick=()=>exportInspectionPdf(r);document.querySelector('#toggleEmh').onclick=()=>{r.emhUpdated=!r.emhUpdated;save();closeDialog();render()};document.querySelector('#exportOne').onclick=()=>exportExcel([r]);document.querySelector('#closeRecord').onclick=closeDialog;document.querySelector('#deleteRecord').onclick=()=>{if(confirm('Delete this inspection record?')){state.records=state.records.filter(x=>x.id!==id);save();closeDialog();render()}}}
function clearData(){if(!confirm('Erase all local inspection records? Export first.'))return;if(!confirm('Final confirmation: erase all records and drafts?'))return;localStorage.removeItem(APP_KEY);localStorage.removeItem(DRAFT_KEY);state=emptyState();draft=null;render()}
function showDialog(title,content){dialogBody.innerHTML=`<h2>${title}</h2>${content.trim().startsWith('<')?content:`<p>${content}</p><div class="actions"><button class="button secondary" id="closeDialog">Close</button></div>`}`;dialog.showModal();const close=document.querySelector('#closeDialog');if(close)close.onclick=closeDialog}
function closeDialog(){dialog.close()}dialog.addEventListener('click',e=>{if(e.target===dialog)closeDialog()});

async function exportInspectionPdf(record){
  try{
    showDialog('Preparing PDF','Generating the Unaccompanied Housing Inspection Checklist directly in the app.');
    const captured=await signatureImagesForRecord(record,0);
    const signatures=[];
    if(captured.housingRep) signatures.push({...captured.housingRep,label:'Housing Rep field signature (supplemental)'});
    if(captured.resident) signatures.push({...captured.resident,label:'Resident field signature (supplemental)'});
    const pdf=buildInspectionPdf(record,signatures);
    const safe=v=>String(v||'').replace(/[^A-Za-z0-9_-]+/g,'-').replace(/^-+|-+$/g,'')||'record';
    download(`UH-${safe(record.type)}-${safe(record.building)}-${safe(record.room)}-${safe(record.date)}.pdf`,pdf);
    closeDialog();
  }catch(error){showDialog('PDF export failed',esc(error.message||'The checklist PDF could not be created.'))}
}
async function signatureImagesForRecord(record,index){const out={};for(const key of ['housingRep','resident']){const data=record.signatures?.[key];if(!data)continue;try{const jpeg=await imageDataToJpeg(data),bytes=base64Bytes(jpeg.split(',')[1]),size=jpegDimensions(bytes);out[key]={key:`Signature${index}${key}`,bytes,...size}}catch{}}return out}
function validRangeRecords(){if(!rangeFrom||!rangeTo){showDialog('Select a date range','Choose both From and Through inspection dates.');return null}if(rangeFrom>rangeTo){showDialog('Invalid date range','The From date must be on or before the Through date.');return null}const records=rangeRecords();if(!records.length){showDialog('No records found','No completed inspections have an inspection date within the selected range.');return null}return records}
function exportRangeExcel(){const records=validRangeRecords();if(records)exportExcel(records,`UH-inspections-${rangeFrom}-through-${rangeTo}.xlsx`)}
async function exportRangePdf(){const records=validRangeRecords();if(!records)return;try{showDialog('Preparing combined PDF',`${records.length} inspection record${records.length===1?'':'s'} will be generated directly by the app.`);const pdfParts=[];for(let i=0;i<records.length;i++){const captured=await signatureImagesForRecord(records[i],i),signatures=[];if(captured.housingRep)signatures.push({...captured.housingRep,label:'Housing Rep field signature (supplemental)'});if(captured.resident)signatures.push({...captured.resident,label:'Resident field signature (supplemental)'});pdfParts.push(buildInspectionPdf(records[i],signatures))}if(records.length===1){download(`UH-inspections-${rangeFrom}-through-${rangeTo}.pdf`,pdfParts[0]);closeDialog();return}showDialog('Combined PDF note','Image-template dependency has been removed. Export individual PDFs from each record for now; combined multi-record PDF will be restored in a later flat-file update.');}catch(error){showDialog('PDF export failed',esc(error.message||'The checklist PDF could not be created.'))}}
function imageDataToJpeg(dataUrl){return new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>{const canvas=document.createElement('canvas');canvas.width=img.naturalWidth||600;canvas.height=img.naturalHeight||120;const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);resolve(canvas.toDataURL('image/jpeg',.9))};img.onerror=reject;img.src=dataUrl})}
function buildInspectionPdf(record,signatureImages=[]){
  const W=595.28,H=841.89,M=34,BOTTOM=34,CW=W-M*2,pages=[];let page,y;
  const isCheckIO=['Check-In','Check-Out'].includes(record.type);
  const newPage=(number=pages.length+1)=>{page={commands:[]};pages.push(page);y=H-42;if(number>1){textAt('UNACCOMPANIED HOUSING INSPECTION',M,H-24,7,true);page.commands.push('0.78 0.82 0.86 RG',`${M} ${H-30} m ${W-M} ${H-30} l S`);y=H-40}};
  const ensure=h=>{if(y-h<BOTTOM)newPage()};
  const wrap=(value,max)=>{const words=pdfPlain(value).split(/\s+/).filter(Boolean),lines=[];let line='';for(let word of words){const next=line?`${line} ${word}`:word;if(next.length>max){if(line)lines.push(line);line=word}else line=next}if(line)lines.push(line);return lines.length?lines:['']};
  function textAt(text,x,atY,size=7,bold=false,color='0.09 0.13 0.16'){page.commands.push(`${color} rg`,`BT /F${bold?'2':'1'} ${size} Tf 1 0 0 1 ${x} ${atY} Tm (${pdfString(text)}) Tj ET`)}
  const rule=(x1,yy,x2)=>page.commands.push('0.45 0.5 0.55 RG',`${x1} ${yy} m ${x2} ${yy} l S`);
  const addSection=title=>{ensure(22);page.commands.push('0.72 0.75 0.76 rg',`${M} ${y-15} ${CW} 18 re f`);textAt(title,M+4,y-11,8,true,'1 1 1');y-=21};
  const drawOption=(x,cy,selected)=>{page.commands.push('0.25 0.3 0.35 RG',`${x} ${cy-3.5} 7 7 re S`);if(selected){const cx=x+3.5,r=1.65,c=r*.5522848;page.commands.push('0 0 0 rg',`${cx+r} ${cy} m ${cx+r} ${cy+c} ${cx+c} ${cy+r} ${cx} ${cy+r} c ${cx-c} ${cy+r} ${cx-r} ${cy+c} ${cx-r} ${cy} c ${cx-r} ${cy-c} ${cx-c} ${cy-r} ${cx} ${cy-r} c ${cx+c} ${cy-r} ${cx+r} ${cy-c} ${cx+r} ${cy} c f`)}};
  const addEhsSection=(name,rows)=>{addSection(name);const opts=[['Yes',M],['No',M+20],['Unknown',M+40],['N/A',M+64]];opts.forEach(([a,x])=>textAt(a==='Unknown'?'UNK':a.toUpperCase(),x,y,5.5,true));textAt('',M+91,y,5.5,true);y-=8;for(const row of rows){const lines=wrap(row.item,88),rh=Math.max(14,lines.length*7+4);ensure(rh);const cy=y-rh/2+2;opts.forEach(([a,x])=>{if(row.choices?.includes(a))drawOption(x+2,cy,row.answer===a)});lines.forEach((ln,i)=>textAt(ln,M+91,y-7-i*7,6.2));y-=rh}const details=record.sectionComments?.[name];textAt('If you answered "No" to any question above, please provide details:',M+91,y-2,5.7,false,'0.35 0.35 0.35');y-=9;rule(M+91,y-2,W-M);if(details)textAt(details,M+94,y-10,6);y-=18};
  const addComponentSection=(name,rows)=>{addSection(name);textAt('Mark section as N/A',M+3,y-2,5.5);y-=7;const x0=M,x1=M+185,x2=M+232,x3=M+292,x4=W-M,rh=14;page.commands.push('0.35 0.4 0.45 RG',`${x0} ${y-rh} ${x4-x0} ${rh} re S`,`${x1} ${y-rh} m ${x1} ${y} l S`,`${x2} ${y-rh} m ${x2} ${y} l S`,`${x3} ${y-rh} m ${x3} ${y} l S`);textAt('Component',x0+3,y-10,6.2,true);textAt('Rating',x1+3,y-10,6.2,true);textAt('Condition',x2+3,y-10,6.2,true);textAt('Comments',x3+3,y-10,6.2,true);y-=rh;for(const row of rows){ensure(rh);page.commands.push('0.5 0.55 0.58 RG',`${x0} ${y-rh} ${x4-x0} ${rh} re S`,`${x1} ${y-rh} m ${x1} ${y} l S`,`${x2} ${y-rh} m ${x2} ${y} l S`,`${x3} ${y-rh} m ${x3} ${y} l S`);textAt(row.item,x0+3,y-10,5.8);textAt(row.rating||'',x1+3,y-10,6);textAt(row.condition||'',x2+3,y-10,6);const comments=wrap(row.comments||'',50);comments.slice(0,2).forEach((ln,i)=>textAt(ln,x3+3,y-8-i*6,5.5));y-=rh}};
  const addChoiceSection=(title,options,selected)=>{addSection(title);const colW=CW/3,rh=15;for(let i=0;i<options.length;i+=3){ensure(rh);for(let c=0;c<3;c++){const opt=options[i+c];if(!opt)continue;const x=M+c*colW;drawOption(x+1,y-5,selected.includes(opt));textAt(opt,x+13,y-8,6.2)}y-=rh}};
  newPage(1);
  if(isCheckIO){
    textAt('UNACCOMPANIED HOUSING INSPECTION CHECKLIST',W/2-126,H-25,11,true);rule(M,H-31,W-M);y=H-47;
    const left=M,labelW=78,valX=left+labelW,right=405;
    const field=(label,val,yy)=>{textAt(label+':',left,yy,6.2,false,'0.35 0.35 0.35');textAt(val||'',valX,yy,6.4)};
    field('Installation',record.formFields?.installation||'CAMP BUTLER MCB - OKINAWA CAMP FUTENMA',y);
    textAt('Date of Inspection:',right,y,6.2,false,'0.35 0.35 0.35');textAt(fmtDate(record.date),right+78,y,6.4);y-=16;
    field('Location',record.formFields?.location||`${state.settings.installationCode||'FT'}-${record.building}-${record.room}`,y);
    textAt('Inspection Number:',right,y,6.2,false,'0.35 0.35 0.35');textAt(record.inspectionNumber||'',right+78,y,6.4);y-=16;
    field('Address',record.formFields?.address||'',y);y-=16;
    field('State/Province',record.formFields?.stateProvince||'OKINAWA',y);textAt('Postal Code:',245,y,6.2,false,'0.35 0.35 0.35');textAt(record.formFields?.postalCode||'96372',302,y,6.4);textAt('Country:',380,y,6.2,false,'0.35 0.35 0.35');textAt(record.formFields?.country||'JAPAN',425,y,6.4);y-=16;
    field('Unit Designation',record.formFields?.unitDesignation||'',y);textAt('Room Designation:',300,y,6.2,false,'0.35 0.35 0.35');textAt(record.formFields?.roomDesignation||'',382,y,6.4);y-=17;
    field('Housing Rep Name',record.inspector||'',y);y-=17;field('Resident Name',record.formFields?.residentName||'',y);y-=17;field('Paygrade / Rank',[record.formFields?.paygrade,record.formFields?.rank].filter(Boolean).join(' / '),y);
    const sigLabelX=300,sigX=390,sigW=165,sigH=16,houseY=H-137,resY=H-154;
    textAt('Housing Rep Signature:',sigLabelX,houseY+5,6.2,false,'0.35 0.35 0.35');page.commands.push('0.45 0.5 0.55 RG',`${sigX} ${houseY} ${sigW} ${sigH} re S`);
    textAt('Resident Signature:',sigLabelX,resY+5,6.2,false,'0.35 0.35 0.35');page.commands.push('0.45 0.5 0.55 RG',`${sigX} ${resY} ${sigW} ${sigH} re S`);
    const ctrlY=resY-14;
    textAt('Re-Inspection:',sigLabelX,ctrlY,6.0,false,'0.35 0.35 0.35');
    const checkBox=(x,yy,selected)=>{page.commands.push('0.25 0.3 0.35 RG',`${x} ${yy-3.5} 7 7 re S`);if(selected){page.commands.push('0 0 0 rg',`${x+1.4} ${yy} m ${x+3.0} ${yy-2.0} l ${x+6.0} ${yy+2.4} l S`)}};
    checkBox(sigLabelX+66,ctrlY+1,(record.reinspection||'No')==='Yes');textAt('Yes',sigLabelX+77,ctrlY,5.8);
    checkBox(sigLabelX+101,ctrlY+1,(record.reinspection||'No')==='No');textAt('No',sigLabelX+112,ctrlY,5.8);
    textAt('Present:',sigLabelX+137,ctrlY,6.0,false,'0.35 0.35 0.35');
    checkBox(sigLabelX+178,ctrlY+1,(record.formFields?.present||'No')==='Yes');textAt('Yes',sigLabelX+189,ctrlY,5.8);
    checkBox(sigLabelX+213,ctrlY+1,(record.formFields?.present||'No')==='No');textAt('No',sigLabelX+224,ctrlY,5.8);
    y-=22;page.commands.push('0.72 0.75 0.76 rg',`${M} ${y-17} ${CW/2} 18 re f`,`${M+CW/2} ${y-17} ${CW/2} 18 re f`);textAt('Property Type',M+80,y-12,8,true,'1 1 1');textAt('Inspection Type',M+CW/2+80,y-12,8,true,'1 1 1');y-=29;textAt(record.formFields?.propertyType||'BARRACKS',M+90,y,8);textAt(inspectionLabel(record.type).toUpperCase(),M+CW/2+65,y,8);y-=18;
    const ehsSections=[...new Set((record.ehsResponses||[]).map(x=>x.section))];
    const compSections=[...new Set((record.componentResponses||[]).map(x=>x.section))];
    ehsSections.forEach(name=>addEhsSection(name,record.ehsResponses.filter(x=>x.section===name)));
    compSections.forEach(name=>addComponentSection(name,record.componentResponses.filter(x=>x.section===name)));
    const followOptions=['None','Re-Inspection Required','Work Request Required','In-House Maintenance','EHS - General Safety','EHS - Radon','EHS - Mold/Moisture Control','EHS - Pest Management','EHS - Asbestos','EHS - Water','EHS - HVAC','EHS - Smoke and Carbon Monoxide Detectors and Fire Sprinklers'];
    addChoiceSection('Follow-up Actions',followOptions,record.followUp||[]);
    addChoiceSection('Overall Inspection Results',['Pass','Pass with Condition','Pass with non-Environmental, Health and Safety','Fail'],[record.outcome||outcomeFor(record)]);
    addSection('Inspection Comments');ensure(62);page.commands.push('0.5 0.55 0.58 RG',`${M} ${y-50} ${CW} 50 re S`);if(record.overallNotes)wrap(record.overallNotes,100).slice(0,5).forEach((ln,i)=>textAt(ln,M+5,y-11-i*8,6));y-=55;
    // Supplemental finger signatures are intentionally placed at the end of the
    // field form.  They do not replace the Page 1 CAC signature fields.
    const fingerSigs=signatureImages.filter(img=>img&&img.bytes);
    if(fingerSigs.length){
      const blockH=34+fingerSigs.length*54;ensure(blockH);addSection('Field Signatures (Supplemental)');
      for(const img of fingerSigs){
        textAt(img.label||'Field Signature',M+3,y-2,6.2,true);
        const boxY=y-45,boxW=220,boxH=38;
        page.commands.push('0.65 0.68 0.72 RG',`${M+3} ${boxY} ${boxW} ${boxH} re S`);
        img.pdfRect=[M+7,boxY+3,M+3+boxW-4,boxY+boxH-3];img.pageIndex=pages.length-1;
        y-=54;
      }
    }
    pages.forEach((p,i)=>p.commands.push('0.4 0.45 0.5 rg',`BT /F1 6 Tf 1 0 0 1 ${M} 18 Tm (${pdfString(`${record.inspectionNumber||record.recordNumber} - Page ${i+1} of ${pages.length}`)}) Tj ET`));
    return assemblePdf(pages,signatureImages,W,H,[{pageIndex:0,name:'HousingRepCACSignature',rect:[sigX,houseY,sigX+sigW,houseY+sigH]},{pageIndex:0,name:'ResidentCACSignature',rect:[sigX,resY,sigX+sigW,resY+sigH]}]);
  }
  textAt('UNACCOMPANIED HOUSING INSPECTION',M,H-27,9,true);textAt('INSPECTION REPORT',M,H-51,18,true);y=H-72;
  [['Inspection Number',record.inspectionNumber||'-'],['Inspection Type',inspectionLabel(record.type)],['Date',fmtDate(record.date)],['Location',record.formFields?.location||`${state.settings.installationCode||'FT'}-${record.building}-${record.room}`],['Building Manager / Housing Rep',record.inspector]].forEach(([k,v])=>{textAt(`${k}: ${v}`,M,y,8);y-=12});
  const ehsSections=[...new Set((record.ehsResponses||[]).map(x=>x.section))];ehsSections.forEach(name=>addEhsSection(name,record.ehsResponses.filter(x=>x.section===name)));const componentSections=[...new Set((record.componentResponses||[]).map(x=>x.section))];componentSections.forEach(name=>addComponentSection(name,record.componentResponses.filter(x=>x.section===name)));addChoiceSection('Follow-up Actions',['None','Re-Inspection Required','Work Request Required','In-House Maintenance'],record.followUp||[]);addChoiceSection('Overall Inspection Results',['Pass','Pass with Condition','Pass with non-Environmental, Health and Safety','Fail'],[record.outcome||outcomeFor(record)]);addSection('Inspection Comments');page.commands.push('0.5 0.55 0.58 RG',`${M} ${y-50} ${CW} 50 re S`);return assemblePdf(pages,signatureImages,W,H,null);
}
function pdfPlain(value){return String(value??'').replace(/[–—]/g,'-').replace(/[“”]/g,'"').replace(/[‘’]/g,"'").replace(/[^\x20-\x7E\n\r\t]/g,'?').replace(/[\r\n\t]+/g,' ').trim()}
function pdfString(value){return pdfPlain(value).replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)')}
function base64Bytes(value){const binary=atob(value),bytes=new Uint8Array(binary.length);for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);return bytes}
function jpegDimensions(bytes){if(bytes[0]!==0xff||bytes[1]!==0xd8)throw new Error('Invalid JPEG');let at=2;while(at<bytes.length){if(bytes[at]!==0xff){at++;continue}const marker=bytes[at+1];if(marker===0xd9||marker===0xda)break;const length=(bytes[at+2]<<8)|bytes[at+3];if(marker>=0xc0&&marker<=0xc3)return{height:(bytes[at+5]<<8)|bytes[at+6],width:(bytes[at+7]<<8)|bytes[at+8]};at+=2+length}throw new Error('JPEG dimensions not found')}
function assemblePdf(pages,images,W,H,signatureFields=null){
  const fields=signatureFields?(Array.isArray(signatureFields)?signatureFields:[signatureFields]):[];
  // Paint captured field signatures only where the form explicitly assigned them.
  images.forEach(img=>{if(!img.pdfRect||img.pageIndex==null)return;const [x1,y1,x2,y2]=img.pdfRect,w=x2-x1,h=y2-y1;pages[img.pageIndex]?.commands.push('q',`${w} 0 0 ${h} ${x1} ${y1} cm`, `/${img.key} Do`,'Q')});
  const enc=new TextEncoder(),objects=[],fontRegular=3,fontBold=4,firstPage=5,pageIds=pages.map((_,i)=>firstPage+i*2),contentIds=pages.map((_,i)=>firstPage+i*2+1),firstImage=firstPage+pages.length*2,imageIds=images.map((_,i)=>firstImage+i),sigWidgetIds=fields.map((_,i)=>firstImage+images.length+i),acroId=fields.length?firstImage+images.length+fields.length:null;
  objects[1]=enc.encode(`<< /Type /Catalog /Pages 2 0 R${fields.length?` /AcroForm ${acroId} 0 R`:''} >>`);objects[2]=enc.encode(`<< /Type /Pages /Kids [${pageIds.map(id=>`${id} 0 R`).join(' ')}] /Count ${pages.length} >>`);objects[fontRegular]=enc.encode('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');objects[fontBold]=enc.encode('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');
  pages.forEach((p,i)=>{const stream=enc.encode(p.commands.join('\n')),xobjects=images.length?` /XObject << ${images.map((img,j)=>`/${img.key} ${imageIds[j]} 0 R`).join(' ')} >>`:'',annots=fields.some(f=>f.pageIndex===i)?` /Annots [${fields.map((f,j)=>f.pageIndex===i?`${sigWidgetIds[j]} 0 R`:'').filter(Boolean).join(' ')}]`:'';objects[pageIds[i]]=enc.encode(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${p.width||W} ${p.height||H}] /Resources << /Font << /F1 ${fontRegular} 0 R /F2 ${fontBold} 0 R >>${xobjects} >> /Contents ${contentIds[i]} 0 R${annots} >>`);objects[contentIds[i]]=joinBytes([enc.encode(`<< /Length ${stream.length} >>\nstream\n`),stream,enc.encode('\nendstream')])});
  images.forEach((img,i)=>objects[imageIds[i]]=joinBytes([enc.encode(`<< /Type /XObject /Subtype /Image /Width ${img.width} /Height ${img.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${img.bytes.length} >>\nstream\n`),img.bytes,enc.encode('\nendstream')]));
  if(fields.length){fields.forEach((f,i)=>{const [x1,y1,x2,y2]=f.rect;objects[sigWidgetIds[i]]=enc.encode(`<< /Type /Annot /Subtype /Widget /FT /Sig /T (${pdfString(f.name)}) /Rect [${x1} ${y1} ${x2} ${y2}] /P ${pageIds[f.pageIndex]} 0 R /F 4 /MK << /BC [0.45 0.5 0.55] /BG [1 1 1] >> >>`)});objects[acroId]=enc.encode(`<< /SigFlags 3 /Fields [${sigWidgetIds.map(id=>`${id} 0 R`).join(' ')}] >>`)}
  const chunks=[new Uint8Array([37,80,68,70,45,49,46,52,10,37,226,227,207,211,10])],offsets=[0];let offset=chunks[0].length;for(let id=1;id<objects.length;id++){const block=joinBytes([enc.encode(`${id} 0 obj\n`),objects[id],enc.encode('\nendobj\n')]);offsets[id]=offset;chunks.push(block);offset+=block.length}const xrefOffset=offset;let xref=`xref\n0 ${objects.length}\n0000000000 65535 f \n`;for(let id=1;id<objects.length;id++)xref+=`${String(offsets[id]).padStart(10,'0')} 00000 n \n`;chunks.push(enc.encode(`${xref}trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`));return new Blob([joinBytes(chunks)],{type:'application/pdf'})
}
function joinBytes(parts){const size=parts.reduce((n,p)=>n+p.length,0),out=new Uint8Array(size);let at=0;parts.forEach(p=>{out.set(p,at);at+=p.length});return out}

function exportExcel(records,filename){const list=records||state.records,sheets=[{name:'Inspection Summary',rows:[['Record Number','eMH Inspection Number','Type','Checkout Stage','Checkout Case ID','Scheduled Final Date','Final Property/Gear Removed','Final Personal Furniture Removed','Final Trash Removed','Final Deep Clean Complete','Final Inspection Notes','Final SR Required','Final SR Repair Note','Date','Installation','Building','Room','Furniture Sets','Building Manager / Housing Rep','Basis','Re-inspection','Resident Name','Paygrade','Rank','Resident Present','Location','Address','Unit Designation','Room Designation','Fire Alarm Inspection Date','Outcome','Follow-up Actions','BM Signature Captured','Resident Signature Captured','eMH Updated','Overall Comments'],...list.map(r=>[r.recordNumber,r.inspectionNumber||'',r.type,r.checkoutStage||'',r.checkoutCaseId||'',r.scheduledFinalDate||'',r.finalReadiness?.personalPropertyRemoved?'Yes':'',r.finalReadiness?.personalFurnitureRemoved?'Yes':'',r.finalReadiness?.trashRemoved?'Yes':'',r.finalReadiness?.deepCleanComplete?'Yes':'',r.finalInspectionNotes||'',r.finalServiceRequestRequired?'Yes':'No',r.finalServiceRequestNote||'',r.date,r.formFields?.installation||state.settings.installation,r.building,r.room,r.occupants,r.inspector,r.basis,r.reinspection||'',r.formFields?.residentName||'',r.formFields?.paygrade||'',r.formFields?.rank||'',r.formFields?.present||'',r.formFields?.location||'',r.formFields?.address||'',r.formFields?.unitDesignation||'',r.formFields?.roomDesignation||'',r.extraFields?.fireAlarmInspectionDate||'',r.outcome,(r.followUp||[]).join('; '),r.signatures?.housingRep?'Yes':'No',r.signatures?.resident?'Yes':'No',r.emhUpdated?'Yes':'No',r.overallNotes])]},{name:'EHS Checklist',rows:[['Record Number','Type','Date','Building','Room','Section','Question','Answer','Section Details'],...list.flatMap(r=>(r.ehsResponses||[]).map(x=>[r.recordNumber,r.type,r.date,r.building,r.room,x.section,x.item,x.answer,r.sectionComments?.[x.section]||'']))]},{name:'Components',rows:[['Record Number','Type','Date','Building','Room','Section','Component','Rating','Condition Code','Comments'],...list.flatMap(r=>(r.componentResponses||[]).map(x=>[r.recordNumber,r.type,r.date,r.building,r.room,x.section,x.item,x.rating,x.condition,x.comments]))]},{name:'Furniture',rows:[['Record Number','Type','Date','Building','Room','Furniture Sets','Item','Quantity Rule','Expected','Present','Missing','Rating','Condition Code','Comments'],...list.flatMap(r=>(r.furniture||[]).map(f=>[r.recordNumber,r.type,r.date,r.building,r.room,r.occupants,f.item,f.mode,f.expected,f.present,f.present===''?'':Math.max(0,f.expected-f.present),f.rating,f.condition,f.comments]))]},{name:'Environmental Readings',rows:[['Record Number','Type','Date','Building','Room','Reading','Outdoor','Unit','Floor Outside Unit','Bedroom','Bathroom','Comments'],...list.flatMap(r=>r.readings?['temperature','humidity','dewPoint'].map(key=>[r.recordNumber,r.type,r.date,r.building,r.room,key,r.readings[key].outdoor,r.readings[key].unit,r.readings[key].floor,r.readings[key].bedroom,r.readings[key].bathroom,r.readings[key].comments]):[])]},{name:'Deficiencies',rows:[['Record Number','Type','Date','Building','Room','Category','Item','Rating or Answer','Condition','Comments'],...list.flatMap(r=>[...(r.ehsResponses||[]).filter(x=>x.answer==='No').map(x=>[r.recordNumber,r.type,r.date,r.building,r.room,x.section,x.item,x.answer,'',r.sectionComments?.[x.section]||'']),...(r.componentResponses||[]).filter(x=>['P','EHS'].includes(x.rating)||x.condition).map(x=>[r.recordNumber,r.type,r.date,r.building,r.room,x.section,x.item,x.rating,x.condition,x.comments]),...(r.furniture||[]).filter(f=>furnitureDeficient(f)).map(f=>[r.recordNumber,r.type,r.date,r.building,r.room,'Furniture',f.item,f.rating,f.condition,`Expected ${f.expected}; present ${f.present}. ${f.comments||''}`])])]}];download(filename||`UH-inspections-${today()}.xlsx`,buildXlsx(sheets))}

function buildXlsx(sheets){const now=new Date().toISOString(),files={'[Content_Types].xml':`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>${sheets.map((_,i)=>`<Override PartName="/xl/worksheets/sheet${i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}</Types>`,'_rels/.rels':`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>`,'docProps/core.xml':`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>UH Field Inspections</dc:title><dc:creator>UH Field App</dc:creator><dcterms:created xsi:type="dcterms:W3CDTF">${now}</dcterms:created></cp:coreProperties>`,'xl/workbook.xml':`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${sheets.map((s,i)=>`<sheet name="${xml(s.name)}" sheetId="${i+1}" r:id="rId${i+1}"/>`).join('')}</sheets></workbook>`,'xl/_rels/workbook.xml.rels':`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheets.map((_,i)=>`<Relationship Id="rId${i+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i+1}.xml"/>`).join('')}<Relationship Id="rId${sheets.length+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,'xl/styles.xml':`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><color rgb="FFFFFFFF"/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF0B1F33"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles><dxfs count="0"/><tableStyles count="0"/></styleSheet>`};sheets.forEach((s,i)=>files[`xl/worksheets/sheet${i+1}.xml`]=sheetXml(s));return zipStore(files,'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')}
function sheetXml(sheet){const rows=sheet.rows.map((row,ri)=>`<row r="${ri+1}">${row.map((v,ci)=>cellXml(v,ri,ci)).join('')}</row>`).join(''),max=Math.max(1,...sheet.rows.map(r=>r.length));return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><cols>${Array.from({length:max},(_,i)=>`<col min="${i+1}" max="${i+1}" width="${i<6?18:28}" customWidth="1"/>`).join('')}</cols><sheetData>${rows}</sheetData><autoFilter ref="A1:${colName(max-1)}${Math.max(1,sheet.rows.length)}"/></worksheet>`}
function cellXml(v,ri,ci){const ref=colName(ci)+(ri+1);if(typeof v==='number')return`<c r="${ref}"><v>${v}</v></c>`;return`<c r="${ref}" t="inlineStr"${ri===0?' s="1"':''}><is><t xml:space="preserve">${xml(v??'')}</t></is></c>`}
function colName(n){let s='';do{s=String.fromCharCode(65+n%26)+s;n=Math.floor(n/26)-1}while(n>=0);return s}
function xml(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c])).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,'')}
function zipStore(fileMap,mime){const enc=new TextEncoder(),parts=[],central=[];let offset=0;Object.entries(fileMap).forEach(([name,text])=>{const n=enc.encode(name),data=enc.encode(text),crc=crc32(data),time=dosTime(new Date()),local=new Uint8Array(30+n.length),d=new DataView(local.buffer);d.setUint32(0,0x04034b50,true);d.setUint16(4,20,true);d.setUint16(8,0,true);d.setUint16(10,time.time,true);d.setUint16(12,time.date,true);d.setUint32(14,crc,true);d.setUint32(18,data.length,true);d.setUint32(22,data.length,true);d.setUint16(26,n.length,true);local.set(n,30);parts.push(local,data);const c=new Uint8Array(46+n.length),cd=new DataView(c.buffer);cd.setUint32(0,0x02014b50,true);cd.setUint16(4,20,true);cd.setUint16(6,20,true);cd.setUint16(12,time.time,true);cd.setUint16(14,time.date,true);cd.setUint32(16,crc,true);cd.setUint32(20,data.length,true);cd.setUint32(24,data.length,true);cd.setUint16(28,n.length,true);cd.setUint32(42,offset,true);c.set(n,46);central.push(c);offset+=local.length+data.length});const size=central.reduce((n,p)=>n+p.length,0),end=new Uint8Array(22),e=new DataView(end.buffer);e.setUint32(0,0x06054b50,true);e.setUint16(8,central.length,true);e.setUint16(10,central.length,true);e.setUint32(12,size,true);e.setUint32(16,offset,true);return new Blob([...parts,...central,end],{type:mime})}
function dosTime(date){return{time:(date.getHours()<<11)|(date.getMinutes()<<5)|(date.getSeconds()>>1),date:((date.getFullYear()-1980)<<9)|((date.getMonth()+1)<<5)|date.getDate()}}
const CRC_TABLE=(()=>{const t=new Uint32Array(256);for(let i=0;i<256;i++){let c=i;for(let k=0;k<8;k++)c=(c&1)?0xedb88320^(c>>>1):c>>>1;t[i]=c>>>0}return t})();
function crc32(bytes){let c=0xffffffff;for(const b of bytes)c=CRC_TABLE[(c^b)&255]^(c>>>8);return(c^0xffffffff)>>>0}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstall=e;const b=document.querySelector('#installBtn');b.hidden=false;b.onclick=async()=>{await deferredInstall.prompt();deferredInstall=null;b.hidden=true}});if('serviceWorker'in navigator)window.addEventListener('load',async()=>{let reloading=false;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(reloading||sessionStorage.getItem('uh-sw-version')===APP_VERSION)return;reloading=true;sessionStorage.setItem('uh-sw-version',APP_VERSION);window.location.reload()});try{const reg=await navigator.serviceWorker.register('sw.js?v=1.0.2',{updateViaCache:'none'});await reg.update()}catch{}});render();


/* ===== Quarterly Inspection module v0.7.0 =====
   Kept in a separate local store so the established Check-In/Out, Command-Directed,
   and Furniture record schemas remain unchanged. */
const Q_KEY=APP_KEY+'-quarterly-v1';
const Q_FAIL=[
 'Inoperable electronic lock / compromised door hardware',
 'Candles, incense, or open-flame device',
 'Smoke detector / fire alarm tampered, missing, or inoperable',
 'Fire egress obstruction',
 'Unauthorized kitchen appliance',
 'Daisy-chained power strips / extension cords',
 'High-draw appliance connected through extension cord / power strip',
 'Unauthorized space heater',
 'Inoperable / missing ceiling light fixture',
 'Dryer exhaust hose disconnected / improperly vented',
 'Severe housekeeping creating fire, sanitation, or biological hazard',
 'Excessive clutter / gear blocking pathway or creating trip hazard',
 'Unauthorized room modification'
];
const Q_NONFAIL=[
 'Inoperable window',
 'Broken / missing HVAC diffuser or register',
 'Inoperable range hood exhaust fan',
 'Inoperable dehumidifier',
 'Clogged sink / slow drain',
 'Compromised / stained ceiling tile',
 'Damaged drywall / minor wall abrasion',
 'Normal-wear cosmetic wall / floor discrepancy',
 'Minor / light housekeeping discrepancy'
];
const Q_DEFAULT_TYPES=['Bedroom','Lounge / Common Area','Game Room','TV Room','Kitchen Area','Common Bathroom','Laundry Room','Linen Closet','Janitor Closet','Storage Room','Office','Mechanical / Utility Room','Other'];
function qEmpty(){return{schemaVersion:1,spaceTypes:[...Q_DEFAULT_TYPES],buildings:{},cycles:[],inspections:[],workOrders:[],lastBackup:''}}
function qLoad(){try{return{...qEmpty(),...(JSON.parse(localStorage.getItem(Q_KEY))||{})}}catch{return qEmpty()}}
let qstate=qLoad(),qscreen='dashboard',qcycleId='',qspaceId='',qeditId='',qEditBuilding='';
function qSave(){localStorage.setItem(Q_KEY,JSON.stringify(qstate))}
function qCycle(){return qstate.cycles.find(x=>x.id===qcycleId)||qstate.cycles[0]||null}
function qBuilding(c){return c?(c.inventorySnapshot||qstate.buildings[c.building]):null}
function qResult(fails,nonfails){return fails.length?'FAIL':nonfails.length?'PASS W/CONDITION':'PASS'}
function qSpaceLabel(s){return s?.designation||s?.name||''}
function qLoc(building,space){const raw=qSpaceLabel(space);return /^\d+$/.test(raw)?`${state.settings.installationCode||'FT'}${building}-${raw}`:`${state.settings.installationCode||'FT'}${building}-${raw}`}
function qFYDefault(){const d=new Date(),y=d.getMonth()>=9?d.getFullYear()+1:d.getFullYear();return`FY${String(y).slice(-2)}`}
function qQuarterDefault(){const m=new Date().getMonth()+1;return m>=10?'Q1':m<=3?'Q2':m<=6?'Q3':'Q4'}
function qStats(c){if(!c)return{};const b=qBuilding(c),spaces=(b?.spaces||[]).filter(x=>x.active!==false),selected=c.scope==='20%'?spaces.filter(x=>(c.spaceIds||[]).includes(x.id)):spaces,target=selected.filter(x=>!(c.commonSpacesNA&&x.type!=='Bedroom')),targetIds=new Set(target.map(x=>x.id)),ins=qstate.inspections.filter(x=>x.cycleId===c.id&&targetIds.has(x.spaceId)),done=new Set(ins.map(x=>x.spaceId)).size;return{target,ins,required:target.length,done,remaining:Math.max(0,target.length-done),pass:ins.filter(x=>x.result==='PASS').length,cond:ins.filter(x=>x.result==='PASS W/CONDITION').length,fail:ins.filter(x=>x.result==='FAIL').length,wo:qstate.workOrders.filter(x=>x.cycleId===c.id&&targetIds.has(x.inspectionId?((qstate.inspections.find(i=>i.id===x.inspectionId)||{}).spaceId):''))}}
function qShuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const r=new Uint32Array(1);crypto.getRandomValues(r);const j=r[0]%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a}
function qSample20(c){const b=qBuilding(c),spaces=(b?.spaces||[]).filter(x=>x.active!==false),beds=spaces.filter(x=>x.type==='Bedroom'),common=spaces.filter(x=>x.type!=='Bedroom'),total=Math.ceil(beds.length*.20);if(!beds.length)return{bedIds:[],commonIds:common.map(x=>x.id),total:0,byDeck:{}};const groups={};beds.forEach(x=>{const d=Number(x.deck)||Number(String(qSpaceLabel(x))[0])||1;(groups[d]??=[]).push(x)});const decks=Object.keys(groups).map(Number).sort((a,b)=>a-b);const alloc=decks.map(d=>{const exact=total*groups[d].length/beds.length,base=Math.floor(exact);return{d,n:base,frac:exact-base}});let used=alloc.reduce((n,x)=>n+x.n,0);[...alloc].sort((a,b)=>b.frac-a.frac||a.d-b.d).forEach(x=>{if(used<total&&x.n<groups[x.d].length){x.n++;used++}});while(used<total){const x=alloc.find(x=>x.n<groups[x.d].length);if(!x)break;x.n++;used++}const bedIds=[],byDeck={};alloc.forEach(x=>{const picked=qShuffle(groups[x.d]).slice(0,x.n);byDeck[x.d]=picked.map(p=>p.id);bedIds.push(...byDeck[x.d])});return{bedIds,commonIds:common.map(x=>x.id),total,byDeck}}
function qGenerate20(c){const sample=qSample20(c);c.sampleDraft=sample.bedIds;c.sampleAccepted=false;c.sampleGeneratedAt=new Date().toISOString();qSave();render()}
function qAccept20(c){if(!(c.sampleDraft||[]).length)return showDialog('Generate sample first','Generate the 20% bedroom sample before accepting it.');const b=qBuilding(c),common=(b?.spaces||[]).filter(x=>x.active!==false&&x.type!=='Bedroom').map(x=>x.id);c.spaceIds=[...c.sampleDraft,...common];c.sampleAccepted=true;c.sampleAcceptedAt=new Date().toISOString();c.sampleMethod='20% of bedrooms, rounded up; proportional allocation by deck; random selection within each deck';c.substitutions=c.substitutions||[];qSave();render();window.scrollTo(0,0)}
function qReplaceSampleRoom(c,oldId){if(!c?.sampleAccepted)return;const b=qBuilding(c),spaces=(b?.spaces||[]).filter(x=>x.active!==false),old=spaces.find(x=>x.id===oldId);if(!old||old.type!=='Bedroom')return;const inspected=qstate.inspections.some(x=>x.cycleId===c.id&&x.spaceId===oldId);if(inspected)return showDialog('Room already inspected','Delete the inspection first if this room must be replaced.');const selected=new Set(c.spaceIds||[]),deck=Number(old.deck)||Number(String(qSpaceLabel(old))[0])||1,candidates=spaces.filter(x=>x.type==='Bedroom'&&(Number(x.deck)||Number(String(qSpaceLabel(x))[0])||1)===deck&&!selected.has(x.id));if(!candidates.length)return showDialog('No replacement available',`There are no unselected bedrooms remaining on Deck ${deck}.`);const replacement=qShuffle(candidates)[0];if(!confirm(`Replace ${qSpaceLabel(old)} with ${qSpaceLabel(replacement)} on Deck ${deck}? The sample size will stay the same.`))return;c.spaceIds=(c.spaceIds||[]).map(x=>x===oldId?replacement.id:x);c.sampleDraft=(c.sampleDraft||[]).map(x=>x===oldId?replacement.id:x);c.substitutions=c.substitutions||[];c.substitutions.push({from:oldId,fromLabel:qSpaceLabel(old),to:replacement.id,toLabel:qSpaceLabel(replacement),deck,date:new Date().toISOString()});qSave();render()}
function quarterlyView(){if(qscreen==='inventory')return qInventoryView();if(qscreen==='inspect')return qInspectView();if(qscreen==='cycle')return qCycleView();return qDashboardView()}
function qDashboardView(){const cycles=[...qstate.cycles].sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));return`<div class="page-head"><div><h2>Quarterly Inspection</h2><p>20% / 100% program · fast room entry · 60-day milestone tracking.</p></div><div class="actions"><button class="button compact" data-action="q-new-cycle">New Cycle</button><button class="button compact secondary" data-action="q-combined-export">Combined Export</button><button class="button compact secondary" data-action="q-inventory">Building Inventory</button></div></div>${cycles.length?cycles.map(c=>{const s=qStats(c),pct=s.required?Math.round(s.done/s.required*100):0;return`<div class="card q-cycle"><div class="page-head compact-head"><div><span class="badge">${esc(c.scope)} · ${esc(c.fy)} ${esc(c.quarter)}</span><h2>Building ${esc(c.building)}</h2><p>${esc(c.inspector)} · ${fmtDate(c.startDate)}</p></div><button class="button compact" data-action="q-open-cycle" data-id="${c.id}">Open</button></div><div class="q-kpis"><b>${s.done}/${s.required}<small> inspected</small></b><b>${s.remaining}<small> remaining</small></b><b>${s.fail}<small> fail</small></b><b>${s.wo.filter(w=>w.status!=='Closed').length}<small> open WO</small></b></div><div class="progress"><i style="width:${pct}%"></i></div></div>`}).join(''):'<div class="card empty">No quarterly cycles yet. Configure a building, then start a 20% or 100% cycle.</div>'}`}
function qInventoryView(){
 const bs=Object.values(qstate.buildings).sort((a,b)=>a.number.localeCompare(b.number,undefined,{numeric:true}));
 const edit=qEditBuilding?qstate.buildings[qEditBuilding]:null;
 const buildings=buildingList();
 const decks=edit?.decks?.length?edit.decks:qInferDecks(edit);
 const deckCount=decks.length||Number(edit?.deckCount)||0;
 return`<div class="page-head"><div><h2>Building & Space Inventory</h2><p>Configure each building once. Quarterly cycles reuse the saved layout.</p></div><button class="button compact outline" data-action="q-dashboard">Back</button></div>
 <div class="card"><h3>${edit?'Edit':'Configure'} Building Inventory</h3><div class="form-grid">
 <div class="field"><label>Building</label><select id="qBldgNo" ${edit?'disabled':''}><option value="">Select building</option>${buildings.map(x=>`<option value="${esc(x)}" ${String(edit?.number||'')===String(x)?'selected':''}>${esc(x)}</option>`).join('')}</select></div>
 <div class="field"><label>Assigned BM</label><input id="qBldgBM" value="${esc(edit?.assignedBM||'')}" readonly><p class="small muted">Automatically populated from the Building Manager assignments in Settings.</p></div>
 <div class="field"><label>Number of Decks / Floors</label><input id="qDeckCount" type="number" min="1" max="20" inputmode="numeric" value="${deckCount||''}" placeholder="Enter number of decks"></div>
 <div class="field"><label>Bedroom Count</label><div id="qBedroomCount" class="inventory-count">${qBedroomCount(decks)} bedrooms</div></div>
 <div class="field full"><div id="qDeckBuilder">${qDeckBuilderHtml(decks)}</div></div>
 <div class="field full"><div class="actions"><button class="button" data-action="q-save-building">${edit?'Update':'Save'} Building Inventory</button>${edit?'<button class="button outline" data-action="q-cancel-building-edit">Cancel Edit</button>':''}</div></div></div></div>
 ${bs.map(b=>{const active=(b.spaces||[]).filter(x=>x.active!==false),bed=active.filter(x=>x.type==='Bedroom').length,common=active.length-bed;return`<div class="card"><div class="page-head compact-head"><div><h3>Building ${esc(b.number)}</h3><p>${esc(b.assignedBM||'')} · ${bed} bedrooms · ${common} common/support · ${active.length} total</p></div><div class="q-icon-actions"><button class="q-icon-btn" title="Edit Building ${esc(b.number)}" aria-label="Edit Building ${esc(b.number)}" data-action="q-edit-building" data-id="${esc(b.number)}">✏️</button><button class="q-icon-btn danger-icon" title="Delete Building ${esc(b.number)}" aria-label="Delete Building ${esc(b.number)}" data-action="q-delete-building" data-id="${esc(b.number)}">🗑️</button></div></div><div class="small">${qBuildingSummary(b)}</div><div class="actions q-card-actions"><button class="button compact secondary" data-action="q-export-building" data-id="${esc(b.number)}">Export JSON</button></div></div>`}).join('')}
 <div class="card"><h3>Building Inventory Import / Export</h3><p class="small muted">Export a single building to share it with another team member. Importing a building JSON adds it or updates the same building number.</p><label class="button secondary" style="cursor:pointer">Import Building JSON<input id="qImportBuilding" type="file" accept="application/json,.json" hidden></label></div>`}
function qInferDecks(b){if(!b)return[];if(Array.isArray(b.decks)&&b.decks.length)return b.decks;const by={};for(const sp of (b.spaces||[]).filter(x=>x.active!==false)){const d=Math.max(1,Number(sp.deck)||(/^[0-9]/.test(sp.designation||'')?Number(String(sp.designation)[0]):1));(by[d]??={number:d,ranges:[],support:[]});if(sp.type==='Bedroom'){}else by[d].support.push({type:sp.type||'Other',name:sp.designation||sp.name||sp.type||'Other'})}const beds=(b.spaces||[]).filter(x=>x.active!==false&&x.type==='Bedroom').map(x=>String(x.designation)).filter(x=>/^\d+$/.test(x));for(const d of Object.keys(by)){const nums=beds.filter(x=>Number(x[0])===Number(d)).map(Number).sort((a,z)=>a-z);if(nums.length){let a=nums[0],prev=nums[0];for(const n of nums.slice(1)){if(n!==prev+1){by[d].ranges.push({from:String(a),to:String(prev)});a=n}prev=n}by[d].ranges.push({from:String(a),to:String(prev)})}}return Object.values(by).sort((a,b)=>a.number-b.number)}
function qBedroomCount(decks){let n=0;for(const d of decks||[])for(const r of d.ranges||[]){const a=Number(r.from),z=Number(r.to);if(a&&z>=a)n+=z-a+1}return n}
function qSupportCounts(d){const counts={};const custom=[];for(const sp of d?.support||[]){const type=sp.type||'Other',name=sp.name||sp.designation||type;if(Q_DEFAULT_TYPES.includes(type)&&type!=='Bedroom'&&type!=='Other'&&(name===type||!name)){counts[type]=(counts[type]||0)+Number(sp.qty||1)}else if(type!=='Bedroom'){custom.push({name:type==='Other'&&name==='Other'?'':name,qty:Number(sp.qty||1)})}}return{counts,custom:custom.slice(0,2)}}
function qDeckBuilderHtml(decks){if(!decks?.length)return'<div class="notice">Enter the number of decks/floors to build the room ranges and common/support spaces.</div>';return decks.map((d,di)=>{const ranges=[...(d.ranges||[])];while(ranges.length<3)ranges.push({from:'',to:''});const sc=qSupportCounts(d),types=Q_DEFAULT_TYPES.filter(t=>!['Bedroom','Other'].includes(t));return`<div class="q-deck-card" data-q-deck="${di}"><div class="q-deck-head"><h3>Deck ${di+1}</h3><button class="button compact secondary" data-action="q-copy-deck" data-id="${di}">Copy Spaces → Next Deck</button></div><div class="q-subhead">Bedroom ranges <span class="muted">· Deck ${di+1} adds ${di+1}00 automatically</span></div><div class="q-range-list">${qRangeBlock(di,0,ranges[0],false)}${qRangeBlock(di,1,ranges[1],true)}${qRangeBlock(di,2,ranges[2],true)}</div><details class="q-support-details"><summary>Common / Support Spaces</summary><div class="q-qty-grid">${types.map(t=>`<label><span>${esc(t)}</span><input type="number" min="0" inputmode="numeric" data-q-space-qty="${di}" data-q-space-type-name="${esc(t)}" value="${sc.counts[t]||''}" placeholder="Enter a number"></label>`).join('')}</div><details class="q-optional"><summary>Additional Space 1 (Optional)</summary>${qCustomSpace(di,0,sc.custom[0])}</details><details class="q-optional"><summary>Additional Space 2 (Optional)</summary>${qCustomSpace(di,1,sc.custom[1])}</details></details></div>`}).join('')}
function qRangeBlock(di,ri,r,optional){const row=qRangeRow(di,ri,r);return optional?`<details class="q-optional q-range-optional" ${(r?.from||r?.to)?'open':''}><summary>Range ${ri+1} (Optional)</summary>${row}</details>`:`<div class="q-range-primary"><div class="small muted">Range 1</div>${row}</div>`}
function qRangeRow(di,ri,r){const a=Number(r.from),z=Number(r.to),preview=Number.isInteger(a)&&Number.isInteger(z)&&r.from!==''&&r.to!==''&&z>=a?`${di+1}${String(a).padStart(2,'0')}–${di+1}${String(z).padStart(2,'0')} · ${z-a+1} rooms`:'';return`<div class="q-range-row"><label>From<input inputmode="numeric" pattern="[0-9]*" data-q-range-from="${di}:${ri}" value="${esc(r.from||'')}" placeholder="Enter room number"></label><label>To<input inputmode="numeric" pattern="[0-9]*" data-q-range-to="${di}:${ri}" value="${esc(r.to||'')}" placeholder="Enter room number"></label>${preview?`<small class="q-range-preview">${preview}</small>`:''}</div>`}
function qCustomSpace(di,si,sp){return`<div class="q-custom-space"><label>Space Name<input data-q-custom-name="${di}:${si}" value="${esc(sp?.name||'')}" placeholder="Enter space name"></label><label>Quantity<input type="number" min="0" inputmode="numeric" data-q-custom-qty="${di}:${si}" value="${sp?.qty||''}" placeholder="Enter a number"></label></div>`}
function qBuildingSummary(b){const decks=qInferDecks(b);return decks.map((d,i)=>{const rc=(d.ranges||[]).map(r=>`${r.from}-${r.to}`).join(', ')||'No bedrooms';const sc=(d.support||[]).map(x=>x.name||x.type).join(', ')||'No common/support spaces';return`<b>Deck ${i+1}:</b> ${esc(rc)}<br><span class="muted">${esc(sc)}</span>`}).join('<br>')||'No spaces configured.'}
function qNewCycleDialog(){const bs=Object.values(qstate.buildings).filter(b=>(b.spaces||[]).some(s=>s.active!==false));if(!bs.length){qscreen='inventory';render();window.scrollTo(0,0);return}showDialog('New Quarterly Cycle',`<div class="stack"><div class="form-grid"><div class="field"><label>Fiscal Year</label><input id="qcFY" value="${qFYDefault()}"></div><div class="field"><label>Quarter</label><select id="qcQ"><option>Q1</option><option>Q2</option><option>Q3</option><option>Q4</option></select></div><div class="field"><label>Scope</label><select id="qcScope"><option>20%</option><option>100%</option></select></div><div class="field"><label>Building</label><select id="qcBuilding">${bs.map(b=>`<option value="${esc(b.number)}">${esc(b.number)}</option>`).join('')}</select></div><div class="field"><label>Start date / Day 1</label><input id="qcDate" type="date" value="${today()}"></div><div class="field"><label>Assigned BM / Lead</label><input id="qcInspector" readonly></div></div><p class="small muted">The saved building inventory is loaded automatically. For 20%, the app can generate a proportional random bedroom sample by deck for your review and acceptance.</p><button class="button full" id="qcCreate">Create Cycle</button></div>`);document.querySelector('#qcQ').value=qQuarterDefault();const sync=()=>{const n=val('qcBuilding');document.querySelector('#qcInspector').value=qstate.buildings[n]?.assignedBM||assignedManager(n)||state.settings.inspector};document.querySelector('#qcBuilding').onchange=sync;sync();document.querySelector('#qcCreate').onclick=()=>{const building=val('qcBuilding'),fy=val('qcFY').trim().toUpperCase(),quarter=val('qcQ'),b=qstate.buildings[building],scope=val('qcScope');const duplicate=qstate.cycles.find(x=>String(x.fy).toUpperCase()===fy&&x.quarter===quarter&&String(x.building)===String(building));if(duplicate){closeDialog();qcycleId=duplicate.id;qscreen='cycle';render();window.scrollTo(0,0);return showDialog('Cycle already exists',`<p>Building <b>${esc(building)}</b> already has a cycle for <b>${esc(fy)} ${esc(quarter)}</b>.</p><p>The existing cycle has been opened so you can continue the inspection.</p><div class="actions"><button class="button" id="closeDialog">Continue</button></div>`)}const snapshot=JSON.parse(JSON.stringify(b));const c={id:uid(),fy,quarter,scope,building,startDate:val('qcDate'),inspector:b.assignedBM||assignedManager(building)||state.settings.inspector,createdAt:new Date().toISOString(),inventorySnapshot:snapshot,commonSpacesNA:false,spaceIds:scope==='100%'?(snapshot.spaces||[]).filter(x=>x.active!==false).map(x=>x.id):[],sampleDraft:[],sampleAccepted:scope==='100%',substitutions:[]};qstate.cycles.unshift(c);qSave();qcycleId=c.id;closeDialog();qscreen='cycle';render();window.scrollTo(0,0)}}
function qCycleView(){const c=qCycle();if(!c){qscreen='dashboard';return qDashboardView()}const s=qStats(c),b=qBuilding(c),start=new Date(c.startDate+'T00:00:00'),day=Math.max(1,Math.floor((new Date()-start)/86400000)+1),phase=day<=30?'PHASE 1 · PHYSICAL INSPECTIONS':day<=60?'PHASE 2 · eMH / WO RECONCILIATION':'PAST 60-DAY WINDOW',pct=s.required?Math.round(s.done/s.required*100):0,phase1Days=30,daysRemaining=Math.max(0,phase1Days-day+1),pacePerDay=s.remaining&&daysRemaining?Math.ceil((s.remaining/daysRemaining)*10)/10:0,expectedDone=s.required?Math.min(s.required,Math.ceil(s.required*Math.min(day,phase1Days)/phase1Days)):0,paceStatus=s.done>=expectedDone?'ON PACE':'BEHIND PACE';const all=(b?.spaces||[]).filter(x=>x.active!==false),selected=new Set(c.spaceIds||[]),bed=s.target.filter(x=>x.type==='Bedroom'),common=s.target.filter(x=>x.type!=='Bedroom'),last=[...s.ins].sort((a,z)=>String(z.updatedAt||z.date).localeCompare(String(a.updatedAt||a.date)))[0];const rows=arr=>arr.map(sp=>{const r=s.ins.filter(x=>x.spaceId===sp.id).slice(-1)[0];return`<div class="record q-space-row" data-q-space-row data-search="${esc((qSpaceLabel(sp)+' '+sp.type).toLowerCase())}"><span><b>${esc(qSpaceLabel(sp))}</b> <span class="muted">${esc(sp.type)}</span></span><span class="q-row-actions">${r?`<b>${esc(r.result)}</b> <button class="button compact outline" data-action="q-inspect-space" data-id="${sp.id}">Edit</button><button class="q-icon-btn danger-icon" data-action="q-delete-inspection" data-id="${r.id}" title="Delete inspection" aria-label="Delete inspection">🗑️</button>`:`<button class="button compact" data-action="q-inspect-space" data-id="${sp.id}">Inspect</button>`}</span></div>`}).join('');return`<div class="page-head"><div><span class="badge">${esc(c.scope)} · ${esc(c.fy)} ${esc(c.quarter)}</span><h2>Building ${esc(c.building)}</h2><p>${phase} · Day ${day}</p></div><div class="q-icon-actions"><button class="button compact outline" data-action="q-dashboard">All Cycles</button><button class="q-icon-btn danger-icon" data-action="q-delete-cycle" data-id="${c.id}" title="Delete this cycle" aria-label="Delete this cycle">🗑️</button></div></div><div class="card q-progress-card"><div class="q-kpis"><b>${s.done}/${s.required}<small> inspected</small></b><b>${s.remaining}<small> remaining</small></b><b>${s.pass}<small> pass</small></b><b>${s.cond}<small> condition</small></b><b>${s.fail}<small> fail</small></b></div><div class="progress"><i style="width:${pct}%"></i></div>${s.required&&s.remaining?`<div class="q-pace"><b>Pace</b><span>${daysRemaining?`${s.remaining} remaining · ${daysRemaining} day${daysRemaining===1?'':'s'} · <b>${pacePerDay}/day</b> · <strong class="${paceStatus==='ON PACE'?'pace-on':'pace-behind'}">${paceStatus}</strong>`:`${s.remaining} remaining · Phase 1 inspection window ended`}</span></div>`:s.required&&s.remaining===0?`<div class="q-pace complete"><b>Pace</b><span>Inspection population complete</span></div>`:''}<div class="actions q-cycle-actions"><button class="button" data-action="q-next">Inspect Next</button>${last?'<button class="button secondary" data-action="q-last-inspected">Last Inspected</button>':''}<button class="button secondary" data-action="q-export-excel">Export Excel</button></div></div><div class="card q-common-na-card"><label class="q-check q-common-na"><input id="qCommonSpacesNA" type="checkbox" ${c.commonSpacesNA?'checked':''}> Common / Support Spaces N/A for this cycle</label><p class="small muted">Removes common/support spaces from Required, Remaining, Pace, and % Complete without changing the building inventory.</p></div>${c.scope==='20%'?qSamplePanel(c,b):''}<div class="card q-space-browser"><div class="q-browser-head"><h3>Inspection Spaces</h3><input id="qSpaceSearch" type="search" placeholder="Search room or space…" autocomplete="off"></div><details class="q-space-group"><summary>Bedrooms <span>${bed.length}</span></summary><div class="q-space-group-body">${bed.length?rows(bed):'<div class="empty">No bedrooms in this cycle.</div>'}</div></details><details class="q-space-group"><summary>Common / Support Spaces <span>${c.commonSpacesNA?'N/A':common.length}</span></summary><div class="q-space-group-body">${c.commonSpacesNA?'<div class="empty">Common/support spaces are marked N/A for this cycle.</div>':common.length?rows(common):'<div class="empty">No common/support spaces in this cycle.</div>'}</div></details><div id="qSearchEmpty" class="empty hidden">No matching room or space.</div></div>`}
function qSamplePanel(c,b){const spaces=(b?.spaces||[]).filter(x=>x.active!==false),beds=spaces.filter(x=>x.type==='Bedroom'),draftIds=c.sampleAccepted?(c.spaceIds||[]).filter(id=>beds.some(x=>x.id===id)):(c.sampleDraft||[]),picked=beds.filter(x=>draftIds.includes(x.id)).sort((a,z)=>(Number(a.deck)-Number(z.deck))||qSpaceLabel(a).localeCompare(qSpaceLabel(z),undefined,{numeric:true})),need=Math.ceil(beds.length*.20),by={};picked.forEach(x=>(by[x.deck]??=[]).push(x));const common=spaces.filter(x=>x.type!=='Bedroom').length;return`<details class="card q-collapsible" ${!c.sampleAccepted?'open':''}><summary>20% Bedroom Sample <span>${picked.length}/${need} selected</span></summary><p class="small muted">App method: 20% of bedrooms, rounded up, allocated proportionally across decks and randomly selected within each deck. This is an app sampling method, not an official USMC sampling rule.</p>${!c.sampleAccepted?`<div class="actions"><button class="button compact" data-action="q-generate-sample">${picked.length?'Regenerate':'Generate'} 20% Sample</button>${picked.length?'<button class="button compact secondary" data-action="q-accept-sample">Accept Sample</button>':''}</div>`:`<div class="notice success"><b>Sample accepted.</b> ${picked.length} bedrooms are locked into this cycle. Use Replace only when an uninspected sampled room is unavailable.</div>`}${picked.length?`<div class="q-sample-list">${Object.keys(by).sort((a,z)=>Number(a)-Number(z)).map(d=>`<div class="q-sample-deck"><b>Deck ${esc(d)}</b><div>${by[d].map(x=>`<span class="q-sample-room">${esc(qSpaceLabel(x))}${c.sampleAccepted?` <button class="q-mini-replace" data-action="q-replace-sample" data-id="${x.id}" title="Replace room">↻</button>`:''}</span>`).join('')}</div></div>`).join('')}</div>`:''}<p class="small muted">${common} common/support space${common===1?'':'s'} remain a separate population and are included unless Common / Support Spaces N/A is checked.</p>${(c.substitutions||[]).length?`<details class="q-sub-log"><summary>Room substitutions (${c.substitutions.length})</summary>${c.substitutions.map(x=>`<div class="small">Deck ${x.deck}: ${esc(x.fromLabel)} → ${esc(x.toLabel)}</div>`).join('')}</details>`:''}</details>`}
function qInspectView(){const c=qCycle(),b=qBuilding(c),sp=(b?.spaces||[]).find(x=>x.id===qspaceId);if(!c||!sp){qscreen='cycle';return qCycleView()}const old=qstate.inspections.find(x=>x.id===qeditId)||qstate.inspections.filter(x=>x.cycleId===c.id&&x.spaceId===sp.id).slice(-1)[0],fails=old?.failCriteria||[],nonfails=old?.nonFailCriteria||[];return`<div class="page-head compact-head"><div><span class="badge">${esc(c.scope)} · ${esc(c.fy)} ${esc(c.quarter)}</span><h2>${esc(qSpaceLabel(sp))}</h2><p>Building ${esc(c.building)} · ${esc(sp.type)} · ${esc(qLoc(c.building,sp))}</p></div><button class="button compact outline" data-action="q-back-cycle">Back</button></div><div class="card q-fast"><h3>Inspection Result</h3><div class="q-big-actions"><button class="button success" data-action="q-pass">✓ PASS & NEXT</button><button class="button danger" data-action="q-deficiency">⚠ DEFICIENCY</button></div><div id="qDefPanel" class="${fails.length||nonfails.length?'':'hidden'}"><div class="q-tabs"><div><h3>FAIL — Critical</h3>${Q_FAIL.map(x=>`<label class="q-check"><input type="checkbox" data-q-fail value="${esc(x)}" ${fails.includes(x)?'checked':''}> ${esc(x)}</label>`).join('')}</div><div><h3>NON-FAIL</h3>${Q_NONFAIL.map(x=>`<label class="q-check"><input type="checkbox" data-q-nonfail value="${esc(x)}" ${nonfails.includes(x)?'checked':''}> ${esc(x)}</label>`).join('')}</div></div><div class="field"><label>Inspector comment (optional)</label><input id="qManualComment" value="${esc(old?.manualComment||'')}" placeholder="Only type what the standard criteria do not explain"></div><div class="field"><label class="q-check"><input id="qWO" type="checkbox" ${old?.woRequired?'checked':''}> Work Order Required</label></div><button class="button full" data-action="q-save-def">Save & Next Room</button></div></div>`}
function qSaveInspection(clean=false){const c=qCycle(),b=qBuilding(c),sp=(b?.spaces||[]).find(x=>x.id===qspaceId);if(!c||!sp)return;const fails=clean?[]:[...document.querySelectorAll('[data-q-fail]:checked')].map(x=>x.value),nonfails=clean?[]:[...document.querySelectorAll('[data-q-nonfail]:checked')].map(x=>x.value),manual=clean?'':val('qManualComment'),woRequired=clean?false:!!document.querySelector('#qWO')?.checked,result=qResult(fails,nonfails),existing=qstate.inspections.find(x=>x.id===qeditId)||qstate.inspections.find(x=>x.cycleId===c.id&&x.spaceId===sp.id),rec={id:existing?.id||uid(),cycleId:c.id,date:today(),building:c.building,spaceId:sp.id,space:qSpaceLabel(sp),spaceType:sp.type,location:qLoc(c.building,sp),inspector:c.inspector,result,failCriteria:fails,nonFailCriteria:nonfails,manualComment:manual,woRequired,updatedAt:new Date().toISOString()};if(existing)Object.assign(existing,rec);else qstate.inspections.push(rec);if(woRequired&&!qstate.workOrders.some(w=>w.inspectionId===rec.id))qstate.workOrders.push({id:uid(),cycleId:c.id,inspectionId:rec.id,building:c.building,space:rec.space,deficiency:[...fails,...nonfails].join('; '),manualComment:manual,woNumber:'',status:'Needs Submission',dateSubmitted:'',dateCompleted:''});if(!woRequired)qstate.workOrders=qstate.workOrders.filter(w=>w.inspectionId!==rec.id);qSave();qGoNext(sp.id)}
function qGoNext(current){const c=qCycle(),s=qStats(c),idx=s.target.findIndex(x=>x.id===current),ordered=[...s.target.slice(idx+1),...s.target.slice(0,idx+1)],next=ordered.find(sp=>!qstate.inspections.some(i=>i.cycleId===c.id&&i.spaceId===sp.id));if(next){qspaceId=next.id;qeditId='';qscreen='inspect'}else qscreen='cycle';render()}
function qCombinedExportDialog(){
 const cycles=[...qstate.cycles].sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));
 if(!cycles.length)return showDialog('Combined Export','No Quarterly cycles are available to export.');
 const groups={};cycles.forEach(c=>{const k=`${c.fy}|${c.quarter}|${c.scope}`;(groups[k]??=[]).push(c)});
 const keys=Object.keys(groups).sort().reverse(),first=keys[0];
 showDialog('Combined Quarterly Export',`<div class="stack"><p class="small muted">Select one FY / Quarter / inspection type, then choose the buildings to append into one Excel workbook.</p><div class="field"><label>Reporting Period</label><select id="qCombinedGroup">${keys.map(k=>{const [fy,q,scope]=k.split('|');return`<option value="${esc(k)}">${esc(fy)} ${esc(q)} · ${esc(scope)}</option>`}).join('')}</select></div><div id="qCombinedBuildings"></div><div class="actions"><button class="button compact outline" id="qCombinedSelectAll">Select All</button><button class="button" id="qCombinedGo">Export Selected</button><button class="button secondary" id="closeDialog">Cancel</button></div></div>`);
 const group=document.querySelector('#qCombinedGroup'),box=document.querySelector('#qCombinedBuildings');
 const draw=()=>{const arr=groups[group.value]||[];box.innerHTML=`<div class="q-combined-list">${arr.map(c=>{const st=qStats(c);return`<label class="q-check q-combined-item"><input type="checkbox" data-q-combined-cycle value="${esc(c.id)}"> <span><b>Building ${esc(c.building)}</b><small>${st.done}/${st.required} inspected · ${st.fail} fail</small></span></label>`}).join('')}</div>`};
 group.onchange=draw;draw();
 document.querySelector('#qCombinedSelectAll').onclick=()=>document.querySelectorAll('[data-q-combined-cycle]').forEach(x=>x.checked=true);
 document.querySelector('#qCombinedGo').onclick=()=>{const ids=[...document.querySelectorAll('[data-q-combined-cycle]:checked')].map(x=>x.value);if(!ids.length)return alert('Select at least one building.');qExportCombined(ids);closeDialog()};
 document.querySelector('#closeDialog').onclick=closeDialog;
}
function qExportCombined(ids){
 const cycles=ids.map(id=>qstate.cycles.find(c=>c.id===id)).filter(Boolean);if(!cycles.length)return;
 const key=c=>`${c.fy}|${c.quarter}|${c.scope}`,k=key(cycles[0]);if(cycles.some(c=>key(c)!==k))return showDialog('Cannot combine cycles','Combined export requires the same FY, Quarter, and inspection type.');
 cycles.sort((a,b)=>String(a.building).localeCompare(String(b.building),undefined,{numeric:true}));
 const compiled=[['Building','Bedroom','PASS/FAIL','Comments']],detail=[['Building','Space','Space Type','Location','PASS/FAIL','FAIL Criteria','NON-FAIL Criteria','Inspector Comments','WO Required','Inspector','Date']],wo=[['Building','Space','Deficiency','Inspector Comments','WO Number','Status','Date Submitted','Date Completed']];
 const summary=[['Building','Required','Inspected','Remaining','PASS','PASS W/CONDITION','FAIL','WO Required','Open WO','% Complete']];
 let totals={required:0,done:0,remaining:0,pass:0,cond:0,fail:0,wo:0,open:0};
 cycles.forEach(c=>{const st=qStats(c),ins=[...st.ins].sort((a,b)=>String(a.location).localeCompare(String(b.location),undefined,{numeric:true})),wos=qstate.workOrders.filter(w=>w.cycleId===c.id);ins.forEach(r=>{compiled.push([r.building,r.location,r.result,[...(r.failCriteria||[]),...(r.nonFailCriteria||[]),r.manualComment].filter(Boolean).join('; ')]);detail.push([r.building,r.space,r.spaceType,r.location,r.result,(r.failCriteria||[]).join('; '),(r.nonFailCriteria||[]).join('; '),r.manualComment,r.woRequired?'Yes':'No',r.inspector,r.date])});wos.forEach(w=>wo.push([w.building,w.space,w.deficiency,w.manualComment,w.woNumber,w.status,w.dateSubmitted,w.dateCompleted]));const woReq=ins.filter(r=>r.woRequired).length,open=wos.filter(w=>w.status!=='Closed').length,pct=st.required?Math.round(st.done/st.required*100):0;summary.push([c.building,st.required,st.done,st.remaining,st.pass,st.cond,st.fail,woReq,open,pct+'%']);totals.required+=st.required;totals.done+=st.done;totals.remaining+=st.remaining;totals.pass+=st.pass;totals.cond+=st.cond;totals.fail+=st.fail;totals.wo+=woReq;totals.open+=open});
 const overallPct=totals.required?Math.round(totals.done/totals.required*100):0;summary.push(['OVERALL',totals.required,totals.done,totals.remaining,totals.pass,totals.cond,totals.fail,totals.wo,totals.open,overallPct+'%']);
 const [fy,q,scope]=k.split('|'),bldgs=cycles.map(c=>c.building).join('-');download(`Quarterly-${fy}-${q}-${scope.replace('%','pct')}-Combined-${bldgs}.xlsx`,buildXlsx([{name:'SUMMARY',rows:summary},{name:'COMPILED RESULTS',rows:compiled},{name:'INSPECTION DETAIL',rows:detail},{name:'WORK ORDERS REQUIRED',rows:wo}]))
}
function qExportExcel(){const c=qCycle(),s=qStats(c);if(!c)return;const compiled=[['Building','Bedroom','PASS/FAIL','Comments'],...s.ins.map(r=>[r.building,r.location,r.result,[...r.failCriteria,...r.nonFailCriteria,r.manualComment].filter(Boolean).join('; ')])];const detail=[['Building','Space','Space Type','Location','PASS/FAIL','FAIL Criteria','NON-FAIL Criteria','Inspector Comments','WO Required','Inspector','Date'],...s.ins.map(r=>[r.building,r.space,r.spaceType,r.location,r.result,r.failCriteria.join('; '),r.nonFailCriteria.join('; '),r.manualComment,r.woRequired?'Yes':'No',r.inspector,r.date])];const wo=[['Building','Space','Deficiency','Inspector Comments','WO Number','Status','Date Submitted','Date Completed'],...s.wo.map(w=>[w.building,w.space,w.deficiency,w.manualComment,w.woNumber,w.status,w.dateSubmitted,w.dateCompleted])];download(`Quarterly-${c.fy}-${c.quarter}-${c.scope.replace('%','pct')}-Bldg-${c.building}.xlsx`,buildXlsx([{name:'COMPILED RESULTS',rows:compiled},{name:'INSPECTION DETAIL',rows:detail},{name:'WORK ORDERS REQUIRED',rows:wo}]))}
function qCollectDecks(){const cards=[...document.querySelectorAll('[data-q-deck]')];return cards.map((card,di)=>{const ranges=[];card.querySelectorAll('[data-q-range-from]').forEach(f=>{const ri=Number(f.dataset.qRangeFrom.split(':')[1]),t=card.querySelector(`[data-q-range-to="${di}:${ri}"]`);ranges.push({from:f.value.trim(),to:t?.value.trim()||''})});const support=[];card.querySelectorAll('[data-q-space-qty]').forEach(inp=>{const qty=Math.max(0,Number(inp.value)||0),type=inp.dataset.qSpaceTypeName;if(qty)for(let n=1;n<=qty;n++)support.push({type,name:qty>1?`${type} ${n}`:type,qty:1})});card.querySelectorAll('[data-q-custom-name]').forEach(inp=>{const si=Number(inp.dataset.qCustomName.split(':')[1]),qtyEl=card.querySelector(`[data-q-custom-qty="${di}:${si}"]`),qty=Math.max(0,Number(qtyEl?.value)||0),name=inp.value.trim();if(name&&qty)for(let n=1;n<=qty;n++)support.push({type:'Other',name:qty>1?`${name} ${n}`:name,qty:1})});return{number:di+1,ranges,support}})}
function qSaveBuilding(){const number=qEditBuilding||val('qBldgNo');if(!number)return showDialog('Building required','Select a building from Settings.');const decks=qCollectDecks();if(!decks.length)return showDialog('Decks required','Enter the number of decks/floors.');const old=qstate.buildings[number],oldSpaces=old?.spaces||[],spaces=[],seen=new Set();const reuse=(type,designation,deck)=>oldSpaces.find(x=>x.type===type&&x.designation===designation&&Number(x.deck||0)===Number(deck));for(const d of decks){for(const r of d.ranges){if(!r.from&&!r.to)continue;const a=Number(r.from),z=Number(r.to);if(!Number.isInteger(a)||!Number.isInteger(z)||a<0||a>99||z<a||z>99)return showDialog('Room range',`Check Deck ${d.number}: enter only the last two digits (for example 1 to 34).`);for(let n=a;n<=z;n++){const designation=`${d.number}${String(n).padStart(2,'0')}`;if(seen.has(designation))return showDialog('Duplicate room',`Room ${designation} appears in more than one range.`);seen.add(designation);const o=reuse('Bedroom',designation,d.number);spaces.push(o?{...o,active:true}:{id:uid(),deck:d.number,type:'Bedroom',designation,active:true})}}for(const sp of d.support){const designation=(sp.name||sp.type).trim();if(!designation)continue;const o=reuse(sp.type,designation,d.number);spaces.push(o?{...o,active:true}:{id:uid(),deck:d.number,type:sp.type,designation,active:true})}}const bm=assignedManager(number)||old?.assignedBM||state.settings.inspector;qstate.buildings[number]={number,assignedBM:bm,deckCount:decks.length,decks,spaces};qEditBuilding='';qSave();render();window.scrollTo(0,0)}
function qExportBuilding(number){const b=qstate.buildings[number];if(b)download(`${state.settings.installationCode||'FT'}-${number}-BuildingConfig.json`,new Blob([JSON.stringify({schemaVersion:1,type:'UHBuildingConfig',building:b},null,2)],{type:'application/json'}))}
async function qImportBuilding(file){if(!file)return;try{const data=JSON.parse(await file.text()),b=data.building||data;if(!b.number||!Array.isArray(b.spaces))throw Error();qstate.buildings[b.number]=b;qSave();render()}catch{showDialog('Import failed','That file is not a valid building configuration backup.')}}
function exportFullBackup(){qstate.lastBackup=new Date().toISOString();qSave();download(`UH-field-app-full-backup-${today()}.json`,new Blob([JSON.stringify({backupType:'UHFieldAppFull',schemaVersion:1,appVersion:APP_VERSION,core:state,quarterly:qstate},null,2)],{type:'application/json'}))}
async function restoreFullBackup(file){if(!file)return;try{const data=JSON.parse(await file.text());if(data.backupType==='UHFieldAppFull'){state={...emptyState(),...(data.core||{})};qstate={...qEmpty(),...(data.quarterly||{})}}else{state={...emptyState(),...data}}save();qSave();showDialog('Backup restored','Core inspection records and Quarterly data were restored.');render()}catch{showDialog('Restore failed','The selected JSON file could not be restored.')}}
function bindQuarterly(){const imp=document.querySelector('#qImportBuilding');if(imp)imp.onchange=e=>qImportBuilding(e.target.files?.[0]);const b=document.querySelector('#qBldgNo'),bm=document.querySelector('#qBldgBM'),dc=document.querySelector('#qDeckCount');if(b&&bm){const syncBM=()=>bm.value=assignedManager(b.value)||qstate.buildings[b.value]?.assignedBM||state.settings.inspector;b.onchange=syncBM;syncBM()}if(dc)dc.onchange=()=>{const count=Math.max(0,Math.min(20,Number(dc.value)||0)),existing=qCollectDecks();const decks=Array.from({length:count},(_,i)=>existing[i]||{number:i+1,ranges:[{from:'',to:''},{from:'',to:''},{from:'',to:''}],support:[]});document.querySelector('#qDeckBuilder').innerHTML=qDeckBuilderHtml(decks);bindQuarterly();qUpdateBedroomCount()};const cna=document.querySelector('#qCommonSpacesNA');if(cna)cna.onchange=()=>{const c=qCycle();if(!c)return;const b=qBuilding(c),commonIds=new Set((b?.spaces||[]).filter(x=>x.active!==false&&x.type!=='Bedroom').map(x=>x.id)),existing=qstate.inspections.filter(x=>x.cycleId===c.id&&commonIds.has(x.spaceId));if(cna.checked&&existing.length&&!confirm(`${existing.length} common/support space inspection${existing.length===1?' has':'s have'} already been recorded. Marking common/support spaces N/A will exclude them from cycle progress and pace, but will not delete those inspection records. Continue?`)){cna.checked=false;return}c.commonSpacesNA=cna.checked;qSave();render();window.scrollTo(0,0)};document.querySelectorAll('[data-q-range-from],[data-q-range-to]').forEach(x=>x.oninput=qUpdateBedroomCount);document.querySelectorAll('[data-q-space-select]').forEach(x=>x.onchange=()=>{});const qs=document.querySelector('#qSpaceSearch');if(qs)qs.oninput=()=>{const term=qs.value.trim().toLowerCase(),rows=[...document.querySelectorAll('[data-q-space-row]')];let shown=0;rows.forEach(r=>{const ok=!term||(r.dataset.search||'').includes(term);r.classList.toggle('hidden',!ok);if(ok)shown++});document.querySelectorAll('.q-space-group').forEach(g=>{const any=[...g.querySelectorAll('[data-q-space-row]')].some(r=>!r.classList.contains('hidden'));if(term&&any)g.open=true});document.querySelector('#qSearchEmpty')?.classList.toggle('hidden',shown>0)}}
function qUpdateBedroomCount(){const el=document.querySelector('#qBedroomCount');if(el)el.textContent=`${qBedroomCount(qCollectDecks())} bedrooms`}
function qRefreshDeckBuilder(decks){const box=document.querySelector('#qDeckBuilder');if(!box)return;box.innerHTML=qDeckBuilderHtml(decks);bindQuarterly();qUpdateBedroomCount()}
const _coreAction=action;
action=function(name,id){
 if(name==='q-dashboard'){qscreen='dashboard';route='quarterly';render();window.scrollTo(0,0);return}
 if(name==='q-inventory'){qscreen='inventory';route='quarterly';render();window.scrollTo(0,0);return}
 if(name==='q-new-cycle')return qNewCycleDialog()
 if(name==='q-open-cycle'){qcycleId=id;qscreen='cycle';render();window.scrollTo(0,0);return}
 if(name==='q-add-range'){const decks=qCollectDecks(),di=Number(id);decks[di].ranges.push({from:'',to:''});qRefreshDeckBuilder(decks);return}
 if(name==='q-remove-range'){if(!confirm('Delete this bedroom range? This cannot be undone.'))return;const decks=qCollectDecks(),[di,ri]=id.split(':').map(Number);decks[di].ranges.splice(ri,1);if(!decks[di].ranges.length)decks[di].ranges=[{from:'',to:''}];qRefreshDeckBuilder(decks);return}
 if(name==='q-add-space'){const decks=qCollectDecks(),di=Number(id);decks[di].support.push({type:'Lounge / Common Area',name:''});qRefreshDeckBuilder(decks);return}
 if(name==='q-remove-space'){if(!confirm('Delete this common/support space? This cannot be undone.'))return;const decks=qCollectDecks(),[di,si]=id.split(':').map(Number);decks[di].support.splice(si,1);qRefreshDeckBuilder(decks);return}
 if(name==='q-copy-deck'){const decks=qCollectDecks(),di=Number(id);if(di>=decks.length-1)return showDialog('Last deck','There is no next deck to copy spaces to.');decks[di+1].support=JSON.parse(JSON.stringify(decks[di].support));qRefreshDeckBuilder(decks);return}
 if(name==='q-save-building')return qSaveBuilding()
 if(name==='q-edit-building'){qEditBuilding=id;qscreen='inventory';render();window.scrollTo(0,0);return}
 if(name==='q-cancel-building-edit'){qEditBuilding='';return render()}
 if(name==='q-export-building')return qExportBuilding(id)
 if(name==='q-delete-building'){if(confirm(`Delete Building ${id} inventory? Historical quarterly cycles will be retained. This cannot be undone.`)){delete qstate.buildings[id];qSave();render()}return}
 if(name==='q-delete-inspection'){const rec=qstate.inspections.find(x=>x.id===id);if(!rec)return;if(confirm(`Delete inspection for Building ${rec.building}, ${rec.space}? Progress will be recalculated. This cannot be undone.`)){qstate.inspections=qstate.inspections.filter(x=>x.id!==id);qstate.workOrders=qstate.workOrders.filter(x=>x.inspectionId!==id);qSave();render()}return}
 if(name==='q-delete-cycle'){const c=qstate.cycles.find(x=>x.id===id);if(!c)return;if(confirm(`Delete ${c.fy} ${c.quarter} cycle for Building ${c.building} and all inspections in this cycle? The master building inventory will remain. This cannot be undone.`)){const ids=new Set(qstate.inspections.filter(x=>x.cycleId===id).map(x=>x.id));qstate.inspections=qstate.inspections.filter(x=>x.cycleId!==id);qstate.workOrders=qstate.workOrders.filter(x=>x.cycleId!==id&&!ids.has(x.inspectionId));qstate.cycles=qstate.cycles.filter(x=>x.id!==id);qcycleId='';qscreen='dashboard';qSave();render();window.scrollTo(0,0)}return}
 if(name==='q-last-inspected'){const c=qCycle(),last=qstate.inspections.filter(x=>x.cycleId===c.id).sort((a,z)=>String(z.updatedAt||z.date).localeCompare(String(a.updatedAt||a.date)))[0];if(!last)return showDialog('No inspections yet','There is no last inspected room in this cycle.');qspaceId=last.spaceId;qeditId=last.id;qscreen='inspect';render();window.scrollTo(0,0);return}
 if(name==='q-generate-sample'){const c=qCycle();if(!c||c.scope!=='20%')return;if(c.sampleAccepted)return showDialog('Sample already accepted','The accepted sample is locked. Replace individual uninspected rooms instead.');return qGenerate20(c)}
 if(name==='q-accept-sample'){const c=qCycle();if(!c||c.scope!=='20%')return;return qAccept20(c)}
 if(name==='q-replace-sample'){const c=qCycle();return qReplaceSampleRoom(c,id)}
 if(name==='q-save-selection'){const c=qCycle();c.spaceIds=[...document.querySelectorAll('[data-q-space-select]:checked')].map(x=>x.dataset.qSpaceSelect);qSave();return render()}
 if(name==='q-inspect-space'){qspaceId=id;const c=qCycle(),old=qstate.inspections.find(x=>x.cycleId===c.id&&x.spaceId===id);qeditId=old?.id||'';qscreen='inspect';return render()}
 if(name==='q-next'){const c=qCycle(),s=qStats(c),next=s.target.find(sp=>!qstate.inspections.some(i=>i.cycleId===c.id&&i.spaceId===sp.id));if(!next)return showDialog('Cycle complete','All selected spaces have an inspection record.');qspaceId=next.id;qeditId='';qscreen='inspect';return render()}
 if(name==='q-back-cycle'){qscreen='cycle';render();window.scrollTo(0,0);return}
 if(name==='q-deficiency'){document.querySelector('#qDefPanel')?.classList.remove('hidden');return}
 if(name==='q-pass')return qSaveInspection(true)
 if(name==='q-save-def')return qSaveInspection(false)
 if(name==='q-export-excel')return qExportExcel()
 if(name==='q-combined-export')return qCombinedExportDialog()
 return _coreAction(name,id)
}


/* ===== v0.8.0 DRAFT EXPERIENCE OVERRIDES ===== */
const V080_PRELOADED_ROOMS={"218":["101","102","103","104","105","106","107","108","109","110","111","112","113","114","115","116","117","119","201","202","203","204","205","206","207","208","209","210","211","212","213","214","215","216","217","218","219","220","221","301","302","303","304","305","306","307","308","309","310","311","312","313","314","315","316","317","318","319","320","321"],"219":["101","102","103","104","105","106","107","108","111","112","113","114","115","116","117","118","119","120","121","122","123","124","125","126","201","202","203","204","205","206","207","208","209","210","211","212","213","214","215","216","217","219","220","221","222","223","224","225","226","227","228","229","230","231","232","301","302","303","304","305","306","307","308","309","310","311","312","313","314","315","316","317","319","320","321","322","323","324","325","326","327","328","329","330","331","332"],"223":["101","102","103","104","105","106","107","108","109","110","111","112","113","114","115","116","117","118","119","120","121","122","123","124","201","202","203","204","205","206","207","208","209","210","211","212","213","214","215","216","217","218","219","220","221","222","223","224","225","301","302","303","304","305","306","307","308","309","310","311","312","313","314","315","316","317","318","319","320","321","322","323","324","325"],"225":["101","102","103","104","105","106","107","108","109","110","111","112","113","114","115","116","117","118","119","120","121","122","123","124","125","126","127","128","129","130","201","202","203","204","205","206","207","208","209","210","211","212","213","214","215","216","217","218","219","220","221","222","223","224","225","226","227","228","229","230","231","232","233","301","302","303","304","305","306","307","308","309","310","311","312","313","314","315","316","317","318","319","320","321","322","323","324","325","326","327","328","329","330","331","332","333","401","402","403","404","405","406","407","408","409","410","411","412","413","414","415","416","417","418","419","420","421","422","423","424","425","426","427","428","429","430","431","432","433"],"226":["101","102","103","104","105","106","107","108","109","110","111","112","113","114","115","116","117","118","119","120","121","122","123","124","125","126","127","128","129","130","201","202","203","204","205","206","207","208","209","210","211","212","213","214","215","216","217","218","219","220","221","222","223","224","225","226","227","228","229","230","231","232","233","301","302","303","304","305","306","307","308","309","310","311","312","313","314","315","316","317","318","319","320","321","322","323","324","325","326","327","328","329","330","331","332","333","401","402","403","404","405","406","407","408","409","410","411","412","413","414","415","416","417","418","419","420","421","422","423","424","425","426","427","428","429","430","431","432","433"],"229":["101","102","103","104","105","106","107","108","109","110","111","112","113","114","115","116","117","118","119","120","121","122","123","124","125","126","127","128","129","130","131","132","133","134","135","136","137","138","139","140","141","142","143","144","145","147","201","202","203","204","205","206","207","208","209","210","211","212","213","214","215","216","217","218","219","220","221","222","223","224","225","226","227","228","229","230","231","232","233","234","235","236","237","238","239","240","241","242","243","244","245","246","247","248","249","251","301","302","303","304","305","306","307","308","309","310","311","312","313","314","315","316","317","318","319","320","321","322","323","324","325","326","327","328","329","330","331","332","333","334","335","336","337","338","339","340","341","342","343","344","345","346","347","348","349","351","401","402","403","404","405","406","407","408","409","410","411","412","413","414","415","416","417","418","419","420","421","422","423","424","425","426","427","428","429","430","431","432","433","434","435","436","437","438","439","440","441","442","443","444","445","446","447","448","449","451"],"400":["101","102","103","104","105","106","107","108","109","110","111","112","113","114","115","116","117","118","119","120","121","122","123","124","125","126","127","128","129","130","131","132","133","134","135","136","137","138","139","140","141","142","143","144","145","147","201","202","203","204","205","206","207","208","209","210","211","212","213","214","215","216","217","218","219","220","221","222","223","224","225","226","227","228","229","230","231","232","233","234","235","236","237","238","239","240","241","242","243","244","245","246","247","248","249","251","301","302","303","304","305","306","307","308","309","310","311","312","313","314","315","316","317","318","319","320","321","322","323","324","325","326","327","328","329","330","331","332","333","334","335","336","337","338","339","340","341","342","343","344","345","346","347","348","349","351","401","402","403","404","405","406","407","408","409","410","411","412","413","414","415","416","417","418","419","420","421","422","423","424","425","426","427","428","429","430","431","432","433","434","435","436","437","438","439","440","441","442","443","444","445","446","447","448","449","451"],"417":["101","102","103","104","105","106","107","108","109","111","112","113","114","115","116","117","118","119","120","201","202","203","204","205","206","207","208","209","211","212","213","214","215","216","217","218","219","220","221","222","223","224"],"428":["100","101","102","103","104","105","106","107","108","109","110","111","112","113","114","200","201","202","203","204","205","206","207","208","209","210","211","212","213"],"429":["112","113","114","115","116","117","118","119","120","121","122","123","124","125","126","205","206","207","208","209","210","211","212","213","214","215","216","217","218"],"431":["100","101","102","103","104","105","106","107","108","109","110","111","112","113","114","115","116","117","118","119","120","121","122","123","124","125","126","127","200","201","202","203","204","205","206","207","208","209","210","211","212","213","214","215","216","217","218","219","220","221","222","223","224","225","226","227","228","229","230","231","232","233","234","235","236","237","238","239","240","241","242","243","300","301","302","303","304","305","306","307","308","309","310","311","312","313","314","315","316","317","318","319","320","321","322","323","324","325","326","327","328","329","330","331","332","333","334","335","336","337","338","339","340","341","342","343","400","401","402","403","404","405","406","407","408","409","410","411","412","413","414","415","416","417","418","419","420","421","422","423","424","425","426","427","428","429","430","431","432","433","434","435","436","437","438","439","440","441","442","443"],"460":["101","102","103","104","105","106","107","108","109","110","111","112","113","114","115","116","117","118","119","120","121","122","123","124","125","126","127","128","129","201","202","203","204","205","206","207","208","209","210","211","212","213","214","215","216","217","218","219","220","221","222","223","224","225","226","227","228","229","230","231","232","301","302","303","304","305","306","307","308","309","310","311","312","313","314","315","316","317","318","319","320","321","322","323","324","325","326","327","328","329","330","331","332","401","402","403","404","405","406","407","408","409","410","411","412","413","414","415","416","417","418","419","420","421","422","423","424","425","426","427","428","429","430","431","432"],"461":["109","110","111","112","113","114","115","116","117","118","119","120","121","122","123","124","125","126","127","128","129","130","131","132","133","134","135","136","205","206","207","208","209","210","211","212","213","214","215","216","217","218","219","220","221","222","223","224","225","226","227","228","229","230","231","232","233","234","235","236","237","238","239"]};
const V080_PRELOADED_BMS=['David Silvaloaso','Marcus Rivera','Darius Bruce','Columbus Wilson','Naomi Davis','Anthony LeCrone'];
const DAILY_KEY=APP_KEY+'-daily-log-v1';
const DAILY_ACTIVITIES=['Room Inspection','Check-In','Check-Out','Room Transfer','Escort','Maintenance / Work Order','Key Service','Lock Service','Common Area / Walkthrough','Property / Furniture','Appliance','Occupancy / Vacancy Verification','Resident Support','Leadership / Unit Coordination','Administrative','Other'];
let dailyState=(()=>{try{return JSON.parse(localStorage.getItem(DAILY_KEY))||{entries:[],lastInspector:'',lastBuilding:''}}catch{return{entries:[],lastInspector:'',lastBuilding:''}}})();
let checkoutPrefill=null;
function dailySave(){localStorage.setItem(DAILY_KEY,JSON.stringify(dailyState))}
function v080NormalizeSettings(){
  state.settings.buildings=Object.keys(V080_PRELOADED_ROOMS).sort((a,b)=>Number(a)-Number(b)).join('\n');
  const existing=managerList();
  state.settings.buildingManagers=[...new Set([...V080_PRELOADED_BMS,...existing])].join('\n');
  state.settings.bmAssignments='';
  save();
}
function v080MakeBuilding(number,rooms){return{number:String(number),deckCount:Math.max(...rooms.map(r=>Number(String(r)[0])||1)),decks:[],spaces:rooms.map(room=>({id:`emh-${number}-${room}`,deck:Number(String(room)[0])||1,type:'Bedroom',designation:String(room)}))}}
function v080EnsureQuarterly(){
  qstate.criteria=qstate.criteria||{fail:[...Q_FAIL],nonfail:[...Q_NONFAIL]};
  if(!Object.keys(qstate.buildings||{}).length){qstate.buildings={};Object.entries(V080_PRELOADED_ROOMS).forEach(([b,rs])=>qstate.buildings[b]=v080MakeBuilding(b,rs));qSave()}
}
v080NormalizeSettings();v080EnsureQuarterly();
assignedManager=function(){return ''};

const _v078_render=render;
render=function(){
  document.querySelectorAll('[data-route]').forEach(b=>b.classList.toggle('active',b.dataset.route===route));
  app.innerHTML=route==='modules'?modulesView():route==='daily'?dailyLogView():route==='inspection'?inspectionView():route==='records'?recordsView():route==='quarterly'?quarterlyView():settingsView();
  bind();
};

function checkoutUpcoming(){
  const finals=new Set(state.records.filter(r=>r.type==='Check-Out'&&r.checkoutStage==='Final Inspection'&&r.checkoutCaseId).map(r=>r.checkoutCaseId));
  return state.records.filter(r=>r.type==='Check-Out'&&r.checkoutStage==='Pre-Inspection'&&r.scheduledFinalDate&&r.checkoutCaseId&&!finals.has(r.checkoutCaseId)).sort((a,b)=>String(a.scheduledFinalDate).localeCompare(String(b.scheduledFinalDate)));
}
modulesView=function(){const pending=state.records.filter(r=>!r.emhUpdated).length,up=checkoutUpcoming();return`<section class="next-hero"><div class="next-hero-copy"><span class="next-badge">NEXT GENERATION · FUTENMA</span><h2>Ready for field operations</h2><p>Choose what you need. Daily Log is first for quick access, but nothing opens until you select it.</p></div><div class="runway-mark" aria-hidden="true"><span></span><span></span><span></span><span></span></div></section><div class="home-pills next-actions"><button class="home-pill primary" data-action="open-daily"><span class="home-icon">⌁</span><span>Daily Log<small>Fast activity entry and twice-monthly reporting</small></span><b class="pill-arrow">›</b></button><button class="home-pill" data-action="start-type" data-id="Check-Out"><span class="home-icon">⇤</span><span>Check-Out<small>Pre-Inspection or Final Inspection</small></span><b class="pill-arrow">›</b></button><button class="home-pill" data-action="start-type" data-id="Check-In"><span class="home-icon">⇥</span><span>Check-In<small>Detailed room-condition inspection</small></span><b class="pill-arrow">›</b></button><button class="home-pill" data-action="open-quarterly"><span class="home-icon">◫</span><span>Inspections<small>20%, 100%, and Fire Inspection</small></span><b class="pill-arrow">›</b></button><button class="home-pill" data-action="start-type" data-id="Furniture-Issued"><span class="home-icon">▤</span><span>Furniture<small>Issued-item quantity and condition verification</small></span><b class="pill-arrow">›</b></button></div><div class="home-status next-status"><div class="status-head"><div><span class="status-kicker">TRANSFER STATUS</span><h3>Operational records</h3></div><span class="version-chip">v${esc(APP_VERSION)}</span></div><div class="status-grid"><div class="status-stat"><span>Completed</span><b>${state.records.length}</b></div><div class="status-stat"><span>Awaiting eMH</span><b>${pending}</b></div></div></div>${up.length?`<div class="card upcoming-card"><div class="page-head compact-head"><div><h3>Upcoming Final Inspections</h3><p>Pre-inspections waiting for final checkout.</p></div></div>${up.slice(0,8).map(r=>`<div class="record"><span><b>${fmtDate(r.scheduledFinalDate)} · Bldg ${esc(r.building)} Room ${esc(r.room)}</b><div class="record-meta">${esc(r.formFields?.residentName||'')} · Pre-inspection ${fmtDate(r.date)}</div></span><button class="button compact" data-action="start-final" data-id="${r.id}">Start Final</button></div>`).join('')}</div>`:''}`};
inspectionView=function(){if(draft)return editorView();return`<div class="page-head"><div><h2>Inspection Forms</h2><p>Detailed resident inspections and the 20% / 100% program are kept separate.</p></div></div><div class="grid"><button class="card choice-card" data-action="start-type" data-id="Check-In"><b>Check-In</b><span>Pre-occupancy readiness</span></button><button class="card choice-card" data-action="start-type" data-id="Check-Out"><b>Check-Out</b><span>Pre or Final checkout inspection</span></button><button class="card choice-card" data-action="start-type" data-id="Furniture-Issued"><b>Furniture Issued Items</b><span>Inventory verification</span></button><button class="card choice-card" data-action="open-quarterly"><b>20% / 100% Inspection</b><span>Fast Pass/Fail program</span></button></div>`};

const _v078_startView=startView;
startView=function(type){
  let html=_v078_startView(type);
  if(type!=='Check-Out')return html;
  const p=checkoutPrefill;
  const stage=p?'Final Inspection':'Pre-Inspection';
  const stageBlock=`<div class="field full checkout-stage-box"><label>Checkout inspection stage *</label><div class="segmented"><label><input type="radio" name="checkoutStage" value="Pre-Inspection" ${stage==='Pre-Inspection'?'checked':''}> <span>1 · PRE-INSPECTION</span></label><label><input type="radio" name="checkoutStage" value="Final Inspection" ${stage==='Final Inspection'?'checked':''}> <span>2 · FINAL INSPECTION</span></label></div></div><div class="field" id="scheduledFinalWrap"><label>Scheduled Final Inspection Date</label><input id="scheduledFinalDate" type="date" value="${esc(p?.scheduledFinalDate||'')}"><small>Used to place the room on the Upcoming Final Inspections list.</small></div><input id="checkoutCaseId" type="hidden" value="${esc(p?.checkoutCaseId||'')}">`;
  html=html.replace('<div class="field"><label>Starting responses</label>',stageBlock+'<div class="field"><label>Starting responses</label>');
  if(p){
    html=html.replace('id="startBuilding" list="buildingList" required','id="startBuilding" list="buildingList" value="'+esc(p.building)+'" required');
    html=html.replace('id="startRoom" required','id="startRoom" value="'+esc(p.room)+'" required');
    html=html.replace('id="startInspector" list="managerList" value="'+esc(state.settings.inspector)+'"','id="startInspector" list="managerList" value="'+esc(p.inspector||'')+'"');
    html=html.replace('id="startResidentName" value="NA"','id="startResidentName" value="'+esc(p.formFields?.residentName||'NA')+'"');
  } else {html=html.replace('id="startInspector" list="managerList" value="'+esc(state.settings.inspector)+'"','id="startInspector" list="managerList" value=""')}
  return html;
};

const _v078_beginInspection=beginInspection;
beginInspection=function(){
  const stage=document.querySelector('input[name="checkoutStage"]:checked')?.value||'';
  const scheduled=val('scheduledFinalDate'),caseId=val('checkoutCaseId');
  _v078_beginInspection();
  if(draft?.type==='Check-Out'){
    draft.checkoutStage=stage||'Pre-Inspection';
    draft.checkoutCaseId=caseId||`COCASE-${draft.building}-${draft.room}-${Date.now()}`;
    draft.scheduledFinalDate=draft.checkoutStage==='Pre-Inspection'?scheduled:'';
    draft.finalReadiness=draft.finalReadiness||{personalPropertyRemoved:false,personalFurnitureRemoved:false,trashRemoved:false,deepCleanComplete:false};
    saveDraft();render();
  }
  checkoutPrefill=null;
};

const _v078_editorView=editorView;
editorView=function(){
  let html=_v078_editorView();
  if(draft?.type!=='Check-Out')return html;
  const stage=draft.checkoutStage||'Pre-Inspection';
  const info=`<div class="card checkout-process"><div class="process-line"><span class="process-step active">1</span><span class="process-bar"></span><span class="process-step ${stage==='Final Inspection'?'active':''}">2</span></div><div class="process-labels"><b>Pre-Inspection</b><b>Final Inspection</b></div><p class="small muted">${stage==='Pre-Inspection'?(draft.scheduledFinalDate?'Final scheduled '+fmtDate(draft.scheduledFinalDate):'Final date not yet scheduled'):'Final checkout requires personal property removed and the room deep cleaned.'}</p></div>`;
  const readiness=stage==='Final Inspection'?`<div class="card final-readiness"><h3>Final Checkout Readiness</h3><p class="small muted">Complete these before the final room-condition inspection can be closed.</p>${[['personalPropertyRemoved','All personal property / gear removed'],['personalFurnitureRemoved','All personal furniture removed'],['trashRemoved','Trash and unwanted items removed'],['deepCleanComplete','Room deep cleaned']].map(([k,l])=>`<label class="readiness-check"><input type="checkbox" data-readiness="${k}" ${draft.finalReadiness?.[k]?'checked':''}> <span>${l}</span></label>`).join('')}</div>`:'';
  return info+readiness+html;
};

const _v078_completeInspection=completeInspection;
completeInspection=function(){
  if(draft?.type==='Check-Out'&&draft.checkoutStage==='Final Inspection'){
    const r=draft.finalReadiness||{};if(!r.personalPropertyRemoved||!r.personalFurnitureRemoved||!r.trashRemoved||!r.deepCleanComplete)return showDialog('Final checkout not ready','Confirm that all personal property/gear and personal furniture are removed, trash is removed, and the room is deep cleaned before completing the Final Inspection.');
  }
  _v078_completeInspection();
};

function qCriteria(){qstate.criteria=qstate.criteria||{fail:[...Q_FAIL],nonfail:[...Q_NONFAIL]};return qstate.criteria}
qNewCycleDialog=function(){const bs=Object.values(qstate.buildings).filter(b=>(b.spaces||[]).length);if(!bs.length)return;showDialog('New 20% / 100% Inspection',`<div class="stack"><div class="form-grid"><div class="field"><label>Building Manager / Inspector *</label><input id="qcInspector" list="qBmList" required placeholder="Select or type name"><datalist id="qBmList">${managerList().map(x=>`<option value="${esc(x)}">`).join('')}</datalist></div><div class="field"><label>Building *</label><select id="qcBuilding">${bs.sort((a,b)=>Number(a.number)-Number(b.number)).map(b=>`<option value="${esc(b.number)}">${esc(b.number)} · ${(b.spaces||[]).length} rooms</option>`).join('')}</select></div><div class="field"><label>Inspection Scope *</label><select id="qcScope"><option>20%</option><option>100%</option></select></div><div class="field"><label>Start date</label><input id="qcDate" type="date" value="${today()}"></div><div class="field"><label>Fiscal Year</label><input id="qcFY" value="${qFYDefault()}"></div><div class="field"><label>Quarter</label><select id="qcQ"><option>Q1</option><option>Q2</option><option>Q3</option><option>Q4</option></select></div></div><div class="notice"><b>No building setup required.</b><div class="small">The room roster is preloaded from the eMH source file. A 20% cycle automatically creates and locks a proportional random sample by deck.</div></div><button class="button full" id="qcCreate">Start Inspection</button></div>`);document.querySelector('#qcQ').value=qQuarterDefault();document.querySelector('#qcCreate').onclick=()=>{const building=val('qcBuilding'),inspector=val('qcInspector'),fy=val('qcFY').toUpperCase(),quarter=val('qcQ'),scope=val('qcScope'),b=qstate.buildings[building];if(!inspector)return showDialog('Building Manager required','Select the Building Manager / Inspector.');const snapshot=JSON.parse(JSON.stringify(b)),c={id:uid(),fy,quarter,scope,building,startDate:val('qcDate'),inspector,createdAt:new Date().toISOString(),inventorySnapshot:snapshot,commonSpacesNA:true,spaceIds:[],sampleDraft:[],sampleAccepted:false,substitutions:[]};if(scope==='100%'){c.spaceIds=snapshot.spaces.map(x=>x.id);c.sampleAccepted=true}else{const sample=qSample20(c);c.spaceIds=[...sample.bedIds];c.sampleDraft=[...sample.bedIds];c.sampleAccepted=true;c.sampleGeneratedAt=new Date().toISOString();c.sampleAcceptedAt=c.sampleGeneratedAt;c.sampleMethod='20% of actual eMH room roster, rounded up; proportional by deck; random within deck'}qstate.cycles.unshift(c);qSave();qcycleId=c.id;closeDialog();qscreen='cycle';render();window.scrollTo(0,0)}};

qInspectView=function(){const c=qCycle(),b=qBuilding(c),sp=(b?.spaces||[]).find(x=>x.id===qspaceId);if(!c||!sp){qscreen='cycle';return qCycleView()}const old=qstate.inspections.find(x=>x.id===qeditId)||qstate.inspections.filter(x=>x.cycleId===c.id&&x.spaceId===sp.id).slice(-1)[0],fails=old?.failCriteria||[],nonfails=old?.nonFailCriteria||[],crit=qCriteria();const chips=(arr,kind,selected)=>arr.map(x=>`<label class="def-chip ${selected.includes(x)?'selected':''}"><input type="checkbox" data-q-${kind} value="${esc(x)}" ${selected.includes(x)?'checked':''}> <span>${esc(x)}</span></label>`).join('');return`<div class="page-head compact-head"><div><span class="badge">${esc(c.scope)} · ${esc(c.fy)} ${esc(c.quarter)}</span><h2>Room ${esc(qSpaceLabel(sp))}</h2><p>Building ${esc(c.building)} · ${esc(c.inspector)}</p></div><button class="button compact outline" data-action="q-back-cycle">Back</button></div><div class="card q-fast"><h3>Inspection Result</h3><div class="q-big-actions"><button class="button success" data-action="q-pass">✓ PASS & NEXT</button><button class="button danger" data-action="q-deficiency">⚠ DEFICIENCY</button></div><div id="qDefPanel" class="${fails.length||nonfails.length||old?.woRequired?'':'hidden'}"><h3>What did you identify?</h3><p class="small muted">Tap every condition that applies. You can select more than one.</p><h4 class="criteria-title fail-title">FAIL criteria</h4><div class="chip-grid">${chips(crit.fail,'fail',fails)}</div><h4 class="criteria-title condition-title">Pass with Condition</h4><div class="chip-grid">${chips(crit.nonfail,'nonfail',nonfails)}</div><div class="field"><label>Inspector comment (optional)</label><textarea id="qManualComment" placeholder="Add context only when the selected criteria do not fully explain the issue">${esc(old?.manualComment||'')}</textarea></div><label class="wo-toggle"><input id="qWO" type="checkbox" ${old?.woRequired?'checked':''}> <span>Work Order Required</span></label><div id="qWONoteWrap" class="field ${old?.woRequired?'':'hidden'}"><label>Repair Needed / Work Order Note *</label><textarea id="qWorkOrderNote" placeholder="State exactly what needs to be repaired or corrected">${esc(old?.workOrderNote||'')}</textarea></div><button class="button full" data-action="q-save-def">Save & Next Room</button></div></div>`};

qSaveInspection=function(clean=false){const c=qCycle(),b=qBuilding(c),sp=(b?.spaces||[]).find(x=>x.id===qspaceId);if(!c||!sp)return;const fails=clean?[]:[...document.querySelectorAll('[data-q-fail]:checked')].map(x=>x.value),nonfails=clean?[]:[...document.querySelectorAll('[data-q-nonfail]:checked')].map(x=>x.value),manual=clean?'':val('qManualComment'),woRequired=clean?false:!!document.querySelector('#qWO')?.checked,workOrderNote=clean?'':val('qWorkOrderNote');if(!clean&&!fails.length&&!nonfails.length)return showDialog('Select a deficiency','Choose at least one Fail or Pass with Condition criterion.');if(woRequired&&!workOrderNote)return showDialog('Work Order note required','Describe what needs to be fixed before saving this room.');const result=qResult(fails,nonfails),existing=qstate.inspections.find(x=>x.id===qeditId)||qstate.inspections.find(x=>x.cycleId===c.id&&x.spaceId===sp.id),rec={id:existing?.id||uid(),cycleId:c.id,date:today(),building:c.building,spaceId:sp.id,space:qSpaceLabel(sp),spaceType:sp.type,location:qLoc(c.building,sp),inspector:c.inspector,result,failCriteria:fails,nonFailCriteria:nonfails,manualComment:manual,woRequired,workOrderNote,updatedAt:new Date().toISOString()};if(existing)Object.assign(existing,rec);else qstate.inspections.push(rec);let w=qstate.workOrders.find(w=>w.inspectionId===rec.id);if(woRequired){const data={cycleId:c.id,inspectionId:rec.id,building:c.building,space:rec.space,deficiency:[...fails,...nonfails].join('; '),manualComment:manual,workOrderNote,woNumber:w?.woNumber||'',status:w?.status||'Needs Submission',dateSubmitted:w?.dateSubmitted||'',dateCompleted:w?.dateCompleted||''};if(w)Object.assign(w,data);else qstate.workOrders.push({id:uid(),...data})}else qstate.workOrders=qstate.workOrders.filter(w=>w.inspectionId!==rec.id);qSave();qGoNext(sp.id)};

const _v078_qCycleView=qCycleView;
qCycleView=function(){let html=_v078_qCycleView();html=html.replace(/<button class="button compact secondary" data-action="q-inventory">Building Inventory<\/button>/g,'');html=html.replace(/<div class="card q-common-na-card">[\s\S]*?<\/div>/,'');if(qCycle()?.scope==='20%')html=html.replace(/<div class="card q-sample[\s\S]*?<\/div>\s*<div class="card q-space-browser">/,'<div class="card q-space-browser">');return html};

qExportExcel=function(){const c=qCycle(),s=qStats(c);if(!c)return;const compiled=[['Building','Bedroom','PASS/FAIL','Comments','WO Required','Work Order Note'],...s.ins.map(r=>[r.building,r.location,r.result,[...(r.failCriteria||[]),...(r.nonFailCriteria||[]),r.manualComment].filter(Boolean).join('; '),r.woRequired?'Yes':'No',r.workOrderNote||''])];const detail=[['Building','Space','Location','PASS/FAIL','FAIL Criteria','PASS W/CONDITION Criteria','Inspector Comments','WO Required','Work Order Note','Inspector','Date'],...s.ins.map(r=>[r.building,r.space,r.location,r.result,(r.failCriteria||[]).join('; '),(r.nonFailCriteria||[]).join('; '),r.manualComment,r.woRequired?'Yes':'No',r.workOrderNote||'',r.inspector,r.date])];const deficiencies=[['Building','Room','Result','Deficiency Type','Deficiency','WO Required','Work Order Note','Inspector Comment'],...s.ins.flatMap(r=>[...(r.failCriteria||[]).map(x=>[r.building,r.space,r.result,'FAIL',x,r.woRequired?'Yes':'No',r.workOrderNote||'',r.manualComment||'']),...(r.nonFailCriteria||[]).map(x=>[r.building,r.space,r.result,'PASS W/CONDITION',x,r.woRequired?'Yes':'No',r.workOrderNote||'',r.manualComment||''])])];const wo=[['Building','Space','Deficiency','Work Order Note','Inspector Comments','WO Number','Status','Date Submitted','Date Completed'],...s.wo.map(w=>[w.building,w.space,w.deficiency,w.workOrderNote||'',w.manualComment,w.woNumber,w.status,w.dateSubmitted,w.dateCompleted])];download(`Quarterly-${c.fy}-${c.quarter}-${c.scope.replace('%','pct')}-Bldg-${c.building}.xlsx`,buildXlsx([{name:'COMPILED RESULTS',rows:compiled},{name:'INSPECTION DETAIL',rows:detail},{name:'DEFICIENCIES',rows:deficiencies},{name:'WORK ORDERS REQUIRED',rows:wo}]))};

function dailyDefaultRange(){const d=new Date(),y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=d.getDate(),start=day<=15?`${y}-${m}-01`:`${y}-${m}-16`,end=day<=15?`${y}-${m}-15`:new Date(y,d.getMonth()+1,0).toISOString().slice(0,10);return{start,end}}
function dailyLogView(){const range=dailyDefaultRange(),entries=[...dailyState.entries].sort((a,b)=>String(b.timestamp).localeCompare(String(a.timestamp)));return`<div class="page-head"><div><span class="badge">FAST ENTRY</span><h2>Daily Log</h2><p>Log the work once; use it later for twice-monthly reporting.</p></div></div><form id="dailyForm" class="card daily-form"><div class="form-grid"><div class="field"><label>Building Manager *</label><input id="dailyInspector" list="dailyBmList" value="${esc(dailyState.lastInspector||'')}" required><datalist id="dailyBmList">${managerList().map(x=>`<option value="${esc(x)}">`).join('')}</datalist></div><div class="field"><label>Building *</label><input id="dailyBuilding" list="dailyBuildingList" value="${esc(dailyState.lastBuilding||'')}" required><datalist id="dailyBuildingList">${buildingList().map(x=>`<option value="${esc(x)}">`).join('')}</datalist></div><div class="field"><label>Room / Area</label><input id="dailyRoom" placeholder="Room, lounge, laundry, exterior…"></div><div class="field"><label>Activity *</label><input id="dailyActivity" list="dailyActivityList" required placeholder="Type or select"><datalist id="dailyActivityList">${DAILY_ACTIVITIES.map(x=>`<option value="${esc(x)}">`).join('')}</datalist></div></div><div class="field"><label>Estimated Duration *</label><div class="duration-chips">${[['5','5 min'],['10','10 min'],['15','15 min'],['30','30 min'],['45','45 min'],['60','1 hr'],['90','1.5 hr'],['120','2 hr+']].map(([v,l])=>`<label><input type="radio" name="dailyDuration" value="${v}" ${v==='15'?'checked':''}><span>${l}</span></label>`).join('')}</div></div><div class="field"><label>Note</label><textarea id="dailyNote" placeholder="Short operational note"></textarea></div><label class="highlight-toggle"><input id="dailyHighlight" type="checkbox"> <span>★ Highlight for twice-monthly summary</span></label><div class="actions"><button class="button" type="submit" data-daily-mode="save">Save</button><button class="button secondary" type="submit" data-daily-mode="another">Save & Add Another</button></div></form><div class="card"><h3>Twice-Monthly Report</h3><div class="form-grid"><div class="field"><label>From</label><input id="dailyFrom" type="date" value="${range.start}"></div><div class="field"><label>Through</label><input id="dailyThrough" type="date" value="${range.end}"></div></div><div class="actions"><button class="button secondary" data-action="daily-export">Export CSV</button><button class="button outline" data-action="daily-copy-summary">Copy Summary</button></div></div><div class="card"><h3>Recent Entries</h3>${entries.length?entries.slice(0,20).map(e=>`<div class="record"><span><b>${new Date(e.timestamp).toLocaleString()} · Bldg ${esc(e.building)} ${esc(e.roomArea||'')}</b><div class="record-meta">${esc(e.activity)} · ${e.durationMinutes} min${e.highlight?' · ★ Highlight':''}<br>${esc(e.note||'')}</div></span><button class="q-icon-btn danger-icon" data-action="daily-delete" data-id="${e.id}">🗑️</button></div>`).join(''):'<div class="empty">No Daily Log entries yet.</div>'}</div>`}
function dailyPeriodEntries(){const f=val('dailyFrom'),t=val('dailyThrough');return dailyState.entries.filter(e=>{const d=String(e.timestamp).slice(0,10);return(!f||d>=f)&&(!t||d<=t)})}
function dailyCsv(){const rows=[['Timestamp','Building Manager','Building','Room / Area','Activity','Duration Minutes','Note','Highlight'],...dailyPeriodEntries().map(e=>[e.timestamp,e.inspector,e.building,e.roomArea,e.activity,e.durationMinutes,e.note,e.highlight?'Yes':'No'])];return rows.map(r=>r.map(v=>'"'+String(v??'').replaceAll('"','""')+'"').join(',')).join('\r\n')}
function dailySummary(){const es=dailyPeriodEntries(),by={},mins=es.reduce((n,e)=>n+(Number(e.durationMinutes)||0),0);es.forEach(e=>{by[e.activity]=(by[e.activity]||0)+1});const f=val('dailyFrom'),t=val('dailyThrough'),high=es.filter(e=>e.highlight);return[`UH Building Manager Activity Summary · ${f||'Start'} through ${t||'Present'}`,`${es.length} actions · ${(mins/60).toFixed(1)} estimated hours · ${new Set(es.map(e=>e.building)).size} buildings supported`,'',...Object.entries(by).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`${k}: ${v}`),...(high.length?['','Significant Actions:',...high.map(e=>`- Bldg ${e.building} ${e.roomArea||''} · ${e.activity}: ${e.note||'Highlighted activity'}`)]:[])].join('\n')}

const _v078_settingsView=settingsView;
settingsView=function(){const crit=qCriteria();return`<div class="page-head"><div><h2>Settings</h2><p>Team roster, inspection criteria, updates, and local data.</p></div></div><div class="stack"><form id="settingsForm" class="card form-grid"><div class="field"><label>Installation</label><input id="setInstallation" value="${esc(state.settings.installation)}"></div><div class="field"><label>Installation code</label><input id="setInstallationCode" value="${esc(state.settings.installationCode||'FT')}" maxlength="4"></div><div class="field full"><label>Building Managers</label><textarea id="setBuildingManagers" class="roster-input">${esc(state.settings.buildingManagers||'')}</textarea><p class="small muted">One name per line. Buildings are not permanently assigned to a BM.</p></div><div class="field full"><label>Preloaded Buildings</label><textarea id="setBuildings" class="roster-input" readonly>${esc(state.settings.buildings||'')}</textarea><p class="small muted">Room rosters are preloaded from the eMH source workbook.</p></div><input id="setInspector" type="hidden" value="${esc(state.settings.inspector||'')}"><input id="setBmAssignments" type="hidden" value=""><div class="field full"><label>20% / 100% — FAIL Criteria</label><textarea id="setQFail" class="criteria-editor">${esc(crit.fail.join('\n'))}</textarea><p class="small muted">One criterion per line. Changes apply to new inspections; completed records retain their selected text.</p></div><div class="field full"><label>20% / 100% — PASS W/CONDITION Criteria</label><textarea id="setQNonfail" class="criteria-editor">${esc(crit.nonfail.join('\n'))}</textarea></div><div class="field full"><button class="button" type="submit">Save Settings</button></div></form><div class="card update-card"><h3>App Update</h3><p class="small muted">Installed version: <b>${esc(APP_VERSION)}</b>. Updates are delivered through the installed web app.</p><button class="button secondary" data-action="check-update">Check for Update</button></div><div class="card"><h3>Local Data</h3><p class="small muted">Export a JSON backup before changing devices or clearing browser data.</p><div class="actions"><button class="button" data-action="export-all">Export Detailed Inspections Excel</button><button class="button secondary" data-action="backup">Export JSON Backup</button><label class="button outline" style="cursor:pointer">Import JSON Backup<input id="restoreBackup" type="file" accept="application/json,.json" hidden></label><button class="button danger" data-action="clear-data">Erase All Data</button></div></div></div>`};

const _v078_bind=bind;
bind=function(){_v078_bind();
  document.querySelectorAll('input[name="checkoutStage"]').forEach(x=>x.onchange=()=>{const w=document.querySelector('#scheduledFinalWrap');if(w)w.classList.toggle('hidden',x.checked&&x.value==='Final Inspection')});
  const stage=document.querySelector('input[name="checkoutStage"]:checked');if(stage?.value==='Final Inspection')document.querySelector('#scheduledFinalWrap')?.classList.add('hidden');
  document.querySelectorAll('[data-readiness]').forEach(x=>x.onchange=()=>{draft.finalReadiness=draft.finalReadiness||{};draft.finalReadiness[x.dataset.readiness]=x.checked;saveDraft()});
  document.querySelectorAll('.def-chip input').forEach(x=>x.onchange=()=>x.closest('.def-chip')?.classList.toggle('selected',x.checked));
  const wo=document.querySelector('#qWO');if(wo)wo.onchange=()=>document.querySelector('#qWONoteWrap')?.classList.toggle('hidden',!wo.checked);
  const sf=document.querySelector('#settingsForm');if(sf)sf.onsubmit=e=>{e.preventDefault();state.settings.installation=val('setInstallation');state.settings.installationCode=(val('setInstallationCode')||'FT').toUpperCase();state.settings.buildings=document.querySelector('#setBuildings')?.value.trim()||state.settings.buildings;state.settings.buildingManagers=document.querySelector('#setBuildingManagers')?.value.trim()||'';state.settings.inspector='';state.settings.bmAssignments='';const f=document.querySelector('#setQFail'),n=document.querySelector('#setQNonfail');if(f&&n)qstate.criteria={fail:settingsList(f.value),nonfail:settingsList(n.value)};save();qSave();showDialog('Settings saved','Team roster and 20% / 100% criteria were updated.');render()};
  const df=document.querySelector('#dailyForm');if(df){let mode='save';df.querySelectorAll('button[type="submit"]').forEach(b=>b.onclick=()=>mode=b.dataset.dailyMode||'save');df.onsubmit=e=>{e.preventDefault();const inspector=val('dailyInspector'),building=val('dailyBuilding'),activity=val('dailyActivity'),dur=Number(document.querySelector('input[name="dailyDuration"]:checked')?.value||0);if(!inspector||!building||!activity||!dur)return showDialog('Daily Log incomplete','Select the BM, building, activity, and duration.');dailyState.entries.push({id:uid(),timestamp:new Date().toISOString(),inspector,building,roomArea:val('dailyRoom'),activity,durationMinutes:dur,note:val('dailyNote'),highlight:!!document.querySelector('#dailyHighlight')?.checked});dailyState.lastInspector=inspector;dailyState.lastBuilding=building;dailySave();render();if(mode==='another'){setTimeout(()=>{document.querySelector('#dailyActivity')?.focus()},0)}}}
};

const _v078_action=action;
action=function(name,id){
  if(name==='open-daily'){route='daily';render();window.scrollTo(0,0);return}
  if(name==='start-final'){const pre=state.records.find(r=>r.id===id);if(!pre)return;checkoutPrefill=pre;pendingType='Check-Out';app.innerHTML=startView('Check-Out');bind();window.scrollTo(0,0);return}
  if(name==='daily-delete'){if(confirm('Delete this Daily Log entry?')){dailyState.entries=dailyState.entries.filter(x=>x.id!==id);dailySave();render()}return}
  if(name==='daily-export'){download(`UH-Daily-Log-${val('dailyFrom')||today()}-through-${val('dailyThrough')||today()}.csv`,new Blob([dailyCsv()],{type:'text/csv;charset=utf-8'}));return}
  if(name==='daily-copy-summary'){const text=dailySummary();navigator.clipboard?.writeText(text).then(()=>showDialog('Summary copied','The twice-monthly summary was copied to the clipboard.')).catch(()=>showDialog('Twice-Monthly Summary',`<pre class="summary-preview">${esc(text)}</pre><div class="actions"><button class="button secondary" id="closeDialog">Close</button></div>`));return}
  _v078_action(name,id);
};

const _v078_restore=restoreFullBackup;
restoreFullBackup=async function(file){if(!file)return;try{const data=JSON.parse(await file.text());if(data.backupType==='UHFieldAppFull')state={...emptyState(),...(data.core||{}),settings:{...emptyState().settings,...(data.core?.settings||{}),bmAssignments:''}};else state={...emptyState(),...data,settings:{...emptyState().settings,...(data.settings||{}),bmAssignments:''}};v080NormalizeSettings();qstate=qEmpty();qstate.criteria={fail:[...Q_FAIL],nonfail:[...Q_NONFAIL]};qstate.buildings={};Object.entries(V080_PRELOADED_ROOMS).forEach(([b,rs])=>qstate.buildings[b]=v080MakeBuilding(b,rs));qSave();save();showDialog('Backup restored','Detailed inspection history was restored. The 20% / 100% program starts fresh with the preloaded eMH room rosters.');render()}catch{showDialog('Restore failed','The selected JSON file could not be restored.')}};

// Refresh once after all draft overrides are loaded.
render();

// v0.8 draft backup/clear behavior: include Daily Log; keep Quarterly fresh only when importing a legacy backup.
exportFullBackup=function(){
  qstate.lastBackup=new Date().toISOString();qSave();dailySave();
  download(`UH-field-next-backup-${today()}.json`,new Blob([JSON.stringify({backupType:'UHFieldAppFull',schemaVersion:2,appVersion:APP_VERSION,core:state,quarterly:qstate,daily:dailyState},null,2)],{type:'application/json'}));
};
const _v080_restoreLegacy=restoreFullBackup;
restoreFullBackup=async function(file){
  if(!file)return;
  try{
    const data=JSON.parse(await file.text());
    if(data.backupType==='UHFieldAppFull'){
      state={...emptyState(),...(data.core||{}),settings:{...emptyState().settings,...(data.core?.settings||{}),bmAssignments:''}};
      dailyState=data.daily||{entries:[],lastInspector:'',lastBuilding:''};
    }else{
      state={...emptyState(),...data,settings:{...emptyState().settings,...(data.settings||{}),bmAssignments:''}};
      dailyState={entries:[],lastInspector:'',lastBuilding:''};
    }
    v080NormalizeSettings();
    // User requested a fresh 20% / 100% program, so legacy quarterly history is intentionally not restored.
    qstate=qEmpty();qstate.criteria={fail:[...Q_FAIL],nonfail:[...Q_NONFAIL]};qstate.buildings={};
    Object.entries(V080_PRELOADED_ROOMS).forEach(([b,rs])=>qstate.buildings[b]=v080MakeBuilding(b,rs));
    qSave();dailySave();save();
    showDialog('Backup restored','Detailed inspection history and Daily Log data were restored when present. The 20% / 100% program starts fresh with the preloaded eMH room rosters.');render();
  }catch{showDialog('Restore failed','The selected JSON file could not be restored.')}
};
clearData=function(){
  if(!confirm('Erase all local detailed inspections, Daily Log entries, and 20% / 100% inspection data? Export a backup first.'))return;
  if(!confirm('Final confirmation: erase all local app data on this device?'))return;
  [APP_KEY,DRAFT_KEY,Q_KEY,DAILY_KEY].forEach(k=>localStorage.removeItem(k));
  state=emptyState();draft=null;dailyState={entries:[],lastInspector:'',lastBuilding:''};qstate=qEmpty();qstate.criteria={fail:[...Q_FAIL],nonfail:[...Q_NONFAIL]};qstate.buildings={};Object.entries(V080_PRELOADED_ROOMS).forEach(([b,rs])=>qstate.buildings[b]=v080MakeBuilding(b,rs));qSave();render();
};

// Final draft refinements.
const _v080_startView2=startView;
startView=function(type){
  let html=_v080_startView2(type);
  if(type!=='Check-Out'){
    // Team build: do not assign a BM simply because a building was selected.
    html=html.replace(/id="startInspector" list="managerList" value="[^"]*"/,'id="startInspector" list="managerList" value=""');
  }
  return html;
};
const _v080_beginInspection2=beginInspection;
beginInspection=function(){
  const scheduledBefore=val('scheduledFinalDate');
  _v080_beginInspection2();
  if(draft?.type==='Check-Out'&&draft.checkoutStage==='Final Inspection'&&scheduledBefore){draft.scheduledFinalDate=scheduledBefore;saveDraft()}
};
const _v078_qDashboardView=qDashboardView;
qDashboardView=function(){
  let html=_v078_qDashboardView();
  html=html.replace(/<button class="button compact secondary" data-action="q-inventory">Building Inventory<\/button>/g,'');
  html=html.replace('No quarterly cycles yet. Configure a building, then start a 20% or 100% cycle.','No 20% / 100% inspections yet. Select New Cycle to begin; room rosters are already preloaded.');
  html=html.replace(/Quarterly Inspection/g,'20% / 100% Inspection');
  return html;
};
qExportCombined=function(ids){
 const cycles=ids.map(id=>qstate.cycles.find(c=>c.id===id)).filter(Boolean);if(!cycles.length)return;
 const key=c=>`${c.fy}|${c.quarter}|${c.scope}`,k=key(cycles[0]);if(cycles.some(c=>key(c)!==k))return showDialog('Cannot combine cycles','Combined export requires the same FY, Quarter, and inspection type.');
 cycles.sort((a,b)=>String(a.building).localeCompare(String(b.building),undefined,{numeric:true}));
 const compiled=[['Building','Bedroom','PASS/FAIL','Comments','WO Required','Work Order Note']],detail=[['Building','Space','Location','PASS/FAIL','FAIL Criteria','PASS W/CONDITION Criteria','Inspector Comments','WO Required','Work Order Note','Inspector','Date']],deficiencies=[['Building','Room','Result','Deficiency Type','Deficiency','WO Required','Work Order Note','Inspector Comment']],wo=[['Building','Space','Deficiency','Work Order Note','Inspector Comments','WO Number','Status','Date Submitted','Date Completed']];
 const summary=[['Building','Required','Inspected','Remaining','PASS','PASS W/CONDITION','FAIL','WO Required','Open WO','% Complete']];
 let totals={required:0,done:0,remaining:0,pass:0,cond:0,fail:0,wo:0,open:0};
 cycles.forEach(c=>{const st=qStats(c),ins=[...st.ins].sort((a,b)=>String(a.location).localeCompare(String(b.location),undefined,{numeric:true})),wos=qstate.workOrders.filter(w=>w.cycleId===c.id);ins.forEach(r=>{compiled.push([r.building,r.location,r.result,[...(r.failCriteria||[]),...(r.nonFailCriteria||[]),r.manualComment].filter(Boolean).join('; '),r.woRequired?'Yes':'No',r.workOrderNote||'']);detail.push([r.building,r.space,r.location,r.result,(r.failCriteria||[]).join('; '),(r.nonFailCriteria||[]).join('; '),r.manualComment,r.woRequired?'Yes':'No',r.workOrderNote||'',r.inspector,r.date]);(r.failCriteria||[]).forEach(x=>deficiencies.push([r.building,r.space,r.result,'FAIL',x,r.woRequired?'Yes':'No',r.workOrderNote||'',r.manualComment||'']));(r.nonFailCriteria||[]).forEach(x=>deficiencies.push([r.building,r.space,r.result,'PASS W/CONDITION',x,r.woRequired?'Yes':'No',r.workOrderNote||'',r.manualComment||'']))});wos.forEach(w=>wo.push([w.building,w.space,w.deficiency,w.workOrderNote||'',w.manualComment,w.woNumber,w.status,w.dateSubmitted,w.dateCompleted]));const woReq=ins.filter(r=>r.woRequired).length,open=wos.filter(w=>w.status!=='Closed').length,pct=st.required?Math.round(st.done/st.required*100):0;summary.push([c.building,st.required,st.done,st.remaining,st.pass,st.cond,st.fail,woReq,open,pct+'%']);totals.required+=st.required;totals.done+=st.done;totals.remaining+=st.remaining;totals.pass+=st.pass;totals.cond+=st.cond;totals.fail+=st.fail;totals.wo+=woReq;totals.open+=open});
 const overallPct=totals.required?Math.round(totals.done/totals.required*100):0;summary.push(['OVERALL',totals.required,totals.done,totals.remaining,totals.pass,totals.cond,totals.fail,totals.wo,totals.open,overallPct+'%']);
 const [fy,q,scope]=k.split('|'),bldgs=cycles.map(c=>c.building).join('-');download(`Quarterly-${fy}-${q}-${scope.replace('%','pct')}-Combined-${bldgs}.xlsx`,buildXlsx([{name:'SUMMARY',rows:summary},{name:'COMPILED RESULTS',rows:compiled},{name:'INSPECTION DETAIL',rows:detail},{name:'DEFICIENCIES',rows:deficiencies},{name:'WORK ORDERS REQUIRED',rows:wo}]))
};

/* ===== v0.8.1 COMMON AREA INSPECTION DRAFT ===== */
const COMMON_AREA_TYPES=['Lounge / Common Area','Common Bathroom','Laundry Room','Hallway / Egress','Stairwell','Entrance / Lobby','Kitchen Area','Game Room','TV Room','Linen Closet','Janitor Closet','Storage Room','Office','Mechanical / Utility Room','Exterior / Grounds','Other'];
function qCommonSpaces(c){return (qBuilding(c)?.spaces||[]).filter(x=>x.type!=='Bedroom')}
function qAddCommonAreaDialog(){
 const c=qCycle(); if(!c)return;
 showDialog('Add Common / Support Area',`<div class="stack"><p class="small muted">Add only the area you are inspecting. This does not change the eMH room roster.</p><div class="form-grid"><div class="field"><label>Area Type *</label><select id="qCommonType">${COMMON_AREA_TYPES.map(x=>`<option>${esc(x)}</option>`).join('')}</select></div><div class="field"><label>Deck / Floor</label><input id="qCommonDeck" inputmode="numeric" placeholder="1, 2, 3…"></div><div class="field full"><label>Area Name / Location *</label><input id="qCommonName" placeholder="Example: 2nd Deck Laundry, East Stairwell, Main Entrance"></div></div><button class="button full" id="qCommonAddSave">Add to This Inspection</button></div>`);
 document.querySelector('#qCommonAddSave').onclick=()=>{const type=val('qCommonType'),name=val('qCommonName').trim(),deck=val('qCommonDeck').trim();if(!name)return showDialog('Area name required','Enter the common/support area or location.');const b=qBuilding(c),sp={id:'common-'+uid(),deck:deck?Number(deck)||deck:'',type,designation:name,cycleAdded:true};b.spaces.push(sp);c.spaceIds=c.spaceIds||[];if(!c.spaceIds.includes(sp.id))c.spaceIds.push(sp.id);c.commonSpacesNA=false;qSave();closeDialog();render();window.scrollTo(0,0)};
}
function qRemoveCommonArea(id){const c=qCycle(),b=qBuilding(c);if(!c||!b)return;const sp=(b.spaces||[]).find(x=>x.id===id);if(!sp||sp.type==='Bedroom')return;const has=qstate.inspections.some(x=>x.cycleId===c.id&&x.spaceId===id);if(has)return showDialog('Inspection already recorded','Delete the inspection record first before removing this common area.');if(!confirm(`Remove ${qSpaceLabel(sp)} from this inspection?`))return;b.spaces=b.spaces.filter(x=>x.id!==id);c.spaceIds=(c.spaceIds||[]).filter(x=>x!==id);qSave();render()}
const _v081_qCycleView=qCycleView;
qCycleView=function(){
 let html=_v081_qCycleView();const c=qCycle();if(!c)return html;const common=qCommonSpaces(c);
 const manager=`<div class="card"><div class="page-head compact-head"><div><h3>Common / Support Areas</h3><p>Inspect lounges, laundry rooms, common bathrooms, hallways/egress, stairwells, entrances, storage and other shared spaces.</p></div><button class="button compact secondary" data-action="q-add-common-area">+ Add Common Area</button></div>${common.length?common.map(sp=>`<div class="record"><span><b>${esc(qSpaceLabel(sp))}</b><div class="record-meta">${esc(sp.type)}${sp.deck?` · Deck ${esc(sp.deck)}`:''}</div></span><span class="q-row-actions"><button class="button compact" data-action="q-inspect-space" data-id="${sp.id}">Inspect</button>${sp.cycleAdded?`<button class="q-icon-btn danger-icon" data-action="q-remove-common-area" data-id="${sp.id}" title="Remove area">🗑️</button>`:''}</span></div>`).join(''):'<div class="empty">No common/support areas added yet.</div>'}</div>`;
 const marker='<div class="card q-space-browser">';
 if(html.includes(marker))html=html.replace(marker,manager+marker);else html+=manager;
 return html;
};
const _v081_qInspectView=qInspectView;
qInspectView=function(){let html=_v081_qInspectView();const c=qCycle(),sp=(qBuilding(c)?.spaces||[]).find(x=>x.id===qspaceId);if(sp&&sp.type!=='Bedroom')html=html.replace(`<h2>Room ${esc(qSpaceLabel(sp))}</h2>`,`<h2>${esc(qSpaceLabel(sp))}</h2>`).replace(/Save & Next Room/g,'Save & Next Area');return html};
const _v081_action=action;
action=function(name,id){if(name==='q-add-common-area')return qAddCommonAreaDialog();if(name==='q-remove-common-area')return qRemoveCommonArea(id);return _v081_action(name,id)};


/* ===== v0.8.2 FIELD WORKFLOW REFINEMENTS ===== */
const V082_COMMON_AREAS=['Lounge / Common Area','Common Bathroom','Laundry Room','Hallway / Egress','Stairwell','Entrance / Lobby','Kitchen Area','Game Room','TV Room','Linen Closet','Janitor Closet','Storage Room','Office','Mechanical / Utility Room','Exterior / Grounds'];
function v082LoadCommonAreas(c){
  const b=qBuilding(c); if(!b)return [];
  const existing=new Set((b.spaces||[]).filter(x=>x.type!=='Bedroom').map(x=>x.type));
  const added=[];
  for(const type of V082_COMMON_AREAS){
    if(existing.has(type))continue;
    const sp={id:'std-common-'+uid(),deck:'',type,designation:type,cycleStandard:true};
    b.spaces.push(sp);added.push(sp.id);existing.add(type);
  }
  return added;
}

// Building Inspections now contains 20%, 100%, and Fire Inspection.
qNewCycleDialog=function(){
 const bs=Object.values(qstate.buildings).filter(b=>(b.spaces||[]).length);if(!bs.length)return;
 showDialog('New Building Inspection',`<div class="stack"><div class="form-grid"><div class="field"><label>Building Manager / Inspector *</label><input id="qcInspector" list="qBmList" required placeholder="Select or type name"><datalist id="qBmList">${managerList().map(x=>`<option value="${esc(x)}">`).join('')}</datalist></div><div class="field"><label>Building *</label><select id="qcBuilding">${bs.sort((a,b)=>Number(a.number)-Number(b.number)).map(b=>`<option value="${esc(b.number)}">${esc(b.number)} · ${(b.spaces||[]).length} rooms</option>`).join('')}</select></div><div class="field"><label>Inspection Type *</label><select id="qcScope"><option value="20%">20% Inspection</option><option value="100%">100% Inspection</option><option value="FIRE">Fire Inspection</option></select></div><div class="field"><label>Start date</label><input id="qcDate" type="date" value="${today()}"></div><div class="field"><label>Fiscal Year</label><input id="qcFY" value="${qFYDefault()}"></div><div class="field"><label>Quarter</label><select id="qcQ"><option>Q1</option><option>Q2</option><option>Q3</option><option>Q4</option></select></div></div><div class="notice"><b>Rooms and common areas load automatically.</b><div class="small">20% samples actual eMH rooms and also loads the standard common-area list. 100% loads all rooms and common areas. Fire Inspection uses the same building-inspection workspace with the standard common-area list.</div></div><button class="button full" id="qcCreate">Start Inspection</button></div>`);
 document.querySelector('#qcQ').value=qQuarterDefault();
 document.querySelector('#qcCreate').onclick=()=>{
   const building=val('qcBuilding'),inspector=val('qcInspector'),fy=val('qcFY').toUpperCase(),quarter=val('qcQ'),scope=val('qcScope'),b=qstate.buildings[building];
   if(!inspector)return showDialog('Building Manager required','Select the Building Manager / Inspector.');
   const snapshot=JSON.parse(JSON.stringify(b)),c={id:uid(),fy,quarter,scope,building,startDate:val('qcDate'),inspector,createdAt:new Date().toISOString(),inventorySnapshot:snapshot,commonSpacesNA:false,spaceIds:[],sampleDraft:[],sampleAccepted:false,substitutions:[]};
   const commonIds=v082LoadCommonAreas(c);
   const allCommon=(c.inventorySnapshot.spaces||[]).filter(x=>x.type!=='Bedroom').map(x=>x.id);
   if(scope==='100%'){
      c.spaceIds=(c.inventorySnapshot.spaces||[]).map(x=>x.id);c.sampleAccepted=true;
   }else if(scope==='FIRE'){
      c.spaceIds=[...allCommon];c.sampleAccepted=true;
   }else{
      const sample=qSample20(c);c.spaceIds=[...sample.bedIds,...allCommon];c.sampleDraft=[...sample.bedIds];c.sampleAccepted=true;c.sampleGeneratedAt=new Date().toISOString();c.sampleAcceptedAt=c.sampleGeneratedAt;c.sampleMethod='20% of actual eMH room roster, rounded up; proportional by deck; random within deck; standard common areas loaded automatically';
   }
   qstate.cycles.unshift(c);qSave();qcycleId=c.id;closeDialog();qscreen='cycle';render();window.scrollTo(0,0);
 };
};

// Replace the add-one-common-area workflow with the auto-loaded common-area checklist.
qCycleView=function(){
 let html=_v081_qCycleView();const c=qCycle();if(!c)return html;
 html=html.replace(/<button class="button compact secondary" data-action="q-inventory">Building Inventory<\/button>/g,'');
 html=html.replace(/<div class="card q-common-na-card">[\s\S]*?<\/div>/,'');
 html=html.replace(/Quarterly Inspection/g,'Building Inspections').replace(/20% \/ 100% program/g,'20% · 100% · Fire Inspection');
 if(c.scope==='20%')html=html.replace(/<div class="card q-sample[\s\S]*?<\/div>\s*<div class="card q-space-browser">/,'<div class="card q-space-browser">');
 return html;
};

// Common areas get PASS / DEFICIENCY / N/A and an always-available note.
qInspectView=function(){
 let html=_v081_qInspectView();const c=qCycle(),sp=(qBuilding(c)?.spaces||[]).find(x=>x.id===qspaceId);if(!c||!sp)return html;
 if(sp.type!=='Bedroom'){
   const old=qstate.inspections.find(x=>x.id===qeditId)||qstate.inspections.filter(x=>x.cycleId===c.id&&x.spaceId===sp.id).slice(-1)[0];
   html=html.replace(`<h2>Room ${esc(qSpaceLabel(sp))}</h2>`,`<h2>${esc(qSpaceLabel(sp))}</h2>`);
   html=html.replace('<div class="q-big-actions"><button class="button success" data-action="q-pass">✓ PASS & NEXT</button><button class="button danger" data-action="q-deficiency">⚠ DEFICIENCY</button></div>',`<div class="q-big-actions"><button class="button success" data-action="q-pass">✓ PASS & NEXT</button><button class="button danger" data-action="q-deficiency">⚠ DEFICIENCY</button><button class="button secondary" data-action="q-na">N/A · DOES NOT EXIST</button></div><div class="field"><label>Area Note (optional)</label><textarea id="qCommonNote" placeholder="Location detail, condition note, or reason for N/A">${esc(old?.manualComment||'')}</textarea></div>`);
   html=html.replace(/Save & Next Room/g,'Save & Next Area');
 }
 return html;
};

const _v082_qSaveInspection=qSaveInspection;
qSaveInspection=function(clean=false){
  const c=qCycle(),sp=(qBuilding(c)?.spaces||[]).find(x=>x.id===qspaceId);
  if(clean&&sp&&sp.type!=='Bedroom'){
    const note=val('qCommonNote');
    const existing=qstate.inspections.find(x=>x.id===qeditId)||qstate.inspections.find(x=>x.cycleId===c.id&&x.spaceId===sp.id);
    const rec={id:existing?.id||uid(),cycleId:c.id,date:today(),building:c.building,spaceId:sp.id,space:qSpaceLabel(sp),spaceType:sp.type,location:qLoc(c.building,sp),inspector:c.inspector,result:'PASS',failCriteria:[],nonFailCriteria:[],manualComment:note,woRequired:false,workOrderNote:'',updatedAt:new Date().toISOString()};
    if(existing)Object.assign(existing,rec);else qstate.inspections.push(rec);qstate.workOrders=qstate.workOrders.filter(w=>w.inspectionId!==rec.id);qSave();return qGoNext(sp.id);
  }
  return _v082_qSaveInspection(clean);
};
function v082SaveNA(){
 const c=qCycle(),sp=(qBuilding(c)?.spaces||[]).find(x=>x.id===qspaceId);if(!c||!sp)return;
 const existing=qstate.inspections.find(x=>x.id===qeditId)||qstate.inspections.find(x=>x.cycleId===c.id&&x.spaceId===sp.id);
 const rec={id:existing?.id||uid(),cycleId:c.id,date:today(),building:c.building,spaceId:sp.id,space:qSpaceLabel(sp),spaceType:sp.type,location:qLoc(c.building,sp),inspector:c.inspector,result:'N/A',failCriteria:[],nonFailCriteria:[],manualComment:val('qCommonNote'),woRequired:false,workOrderNote:'',updatedAt:new Date().toISOString()};
 if(existing)Object.assign(existing,rec);else qstate.inspections.push(rec);qstate.workOrders=qstate.workOrders.filter(w=>w.inspectionId!==rec.id);qSave();qGoNext(sp.id);
}

// Simple phone-to-desktop sync package: export everything, then merge by record ID on the desktop.
function v082SyncExport(){
 qSave();dailySave();save();
 const data={syncType:'UHFieldSync',schemaVersion:1,appVersion:APP_VERSION,exportedAt:new Date().toISOString(),coreRecords:state.records||[],dailyEntries:dailyState.entries||[],quarterly:{cycles:qstate.cycles||[],inspections:qstate.inspections||[],workOrders:qstate.workOrders||[],criteria:qstate.criteria||null},settings:{buildingManagers:state.settings.buildingManagers||'',installation:state.settings.installation||'',installationCode:state.settings.installationCode||'FT'}};
 download(`UH-Field-Desktop-Sync-${today()}.json`,new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));
}
function v082MergeById(a,b){const m=new Map((a||[]).map(x=>[x.id,x]));for(const x of (b||[])){if(!x?.id)continue;const old=m.get(x.id);m.set(x.id,!old||String(x.updatedAt||x.completedAt||x.timestamp||'')>=String(old.updatedAt||old.completedAt||old.timestamp||'')?x:old)}return [...m.values()]}
async function v082SyncImport(file){
 if(!file)return;try{const d=JSON.parse(await file.text());if(d.syncType!=='UHFieldSync')throw Error('Not a sync package');
 state.records=v082MergeById(state.records,d.coreRecords);dailyState.entries=v082MergeById(dailyState.entries,d.dailyEntries);if(d.settings?.buildingManagers)state.settings.buildingManagers=d.settings.buildingManagers;
 qstate.cycles=v082MergeById(qstate.cycles,d.quarterly?.cycles);qstate.inspections=v082MergeById(qstate.inspections,d.quarterly?.inspections);qstate.workOrders=v082MergeById(qstate.workOrders,d.quarterly?.workOrders);if(d.quarterly?.criteria)qstate.criteria=d.quarterly.criteria;
 save();dailySave();qSave();showDialog('Desktop sync complete',`Merged ${d.coreRecords?.length||0} detailed records, ${d.dailyEntries?.length||0} Daily Log entries, and building-inspection data without deleting records already on this device.`);render();
 }catch(e){showDialog('Sync import failed','Select a UH Field Desktop Sync JSON file.');}
}

const _v082_settingsView=settingsView;
settingsView=function(){let html=_v082_settingsView();const card=`<div class="card"><h3>Desktop Sync</h3><p class="small muted">Use this to move all field data between the phone app and a desktop copy. Export on one device, then Import & Merge on the other. Existing records are matched by ID instead of being erased.</p><div class="actions"><button class="button" data-action="sync-export">Export Sync Package</button><label class="button secondary" style="cursor:pointer">Import & Merge Sync Package<input id="syncImport" type="file" accept="application/json,.json" hidden></label></div></div>`;return html.replace('<div class="card update-card">',card+'<div class="card update-card">')};

const _v082_bind=bind;
bind=function(){_v082_bind();const si=document.querySelector('#syncImport');if(si)si.onchange=e=>v082SyncImport(e.target.files?.[0]);};
const _v082_action=action;
action=function(name,id){if(name==='q-na')return v082SaveNA();if(name==='sync-export')return v082SyncExport();return _v082_action(name,id)};



/* ===== v0.8.3 FIRE INSPECTION — AUTO DECKS + REQUIRED FIRE CATEGORIES ===== */
const V083_FIRE_CATEGORIES=[
  {key:'extinguishers',label:'Fire Extinguishers',defs:['Missing','Inspection/Service Due','Damaged','Blocked / Not Accessible','Not Properly Mounted','Other']},
  {key:'egressDoors',label:'Emergency / Egress Doors',defs:['Does Not Close','Does Not Latch','Blocked / Obstructed','Damaged Door / Hardware','Improperly Secured','Other']},
  {key:'fireExits',label:'Fire Exits / Egress Routes',defs:['Blocked Egress','Exit Obstructed','Storage in Egress Path','Exit Door Blocked','Trip / Access Hazard','Other']},
  {key:'signage',label:'Signs / Posted Fire Information',defs:['Missing Fire Exit Map','Missing Fire Extinguisher Instructions','Luminous / Exit Sign Not Illuminated','Sign Damaged','Sign Obstructed / Not Visible','Incorrect Direction / Placement','Other']}
];
function v083Ordinal(n){return n===1?'1st':n===2?'2nd':n===3?'3rd':`${n}th`}
function v083InferDeckCount(building){
  const rooms=(building?.spaces||[]).filter(x=>x.type==='Bedroom').map(x=>String(qSpaceLabel(x)||'').trim());
  const decks=rooms.map(r=>{const m=r.match(/^(\d{3,4})/);return m?Math.floor(Number(m[1])/100):0}).filter(n=>n>0&&n<10);
  return decks.length?Math.max(...decks):1;
}
function v083FireSpaces(building){
  const count=v083InferDeckCount(building),out=[];
  for(let deck=1;deck<=count;deck++)for(const cat of V083_FIRE_CATEGORIES)out.push({
    id:`fire-${building.number}-${deck}-${cat.key}`,
    deck:String(deck),type:'Fire Inspection',fireCategory:cat.key,
    designation:`${v083Ordinal(deck)} Deck · ${cat.label}`
  });
  return out;
}
function v083FireCat(sp){return V083_FIRE_CATEGORIES.find(x=>x.key===sp?.fireCategory)||V083_FIRE_CATEGORIES[0]}

// New-cycle dialog: FIRE creates deck-by-deck fire inspection items instead of room/common-area items.
qNewCycleDialog=function(){
 const bs=Object.values(qstate.buildings).filter(b=>(b.spaces||[]).length);if(!bs.length)return;
 showDialog('New Building Inspection',`<div class="stack"><div class="form-grid"><div class="field"><label>Building Manager / Inspector *</label><input id="qcInspector" list="qBmList" required placeholder="Select or type name"><datalist id="qBmList">${managerList().map(x=>`<option value="${esc(x)}">`).join('')}</datalist></div><div class="field"><label>Building *</label><select id="qcBuilding">${bs.sort((a,b)=>Number(a.number)-Number(b.number)).map(b=>`<option value="${esc(b.number)}">${esc(b.number)} · ${(b.spaces||[]).filter(x=>x.type==='Bedroom').length} rooms · ${v083InferDeckCount(b)} deck${v083InferDeckCount(b)===1?'':'s'}</option>`).join('')}</select></div><div class="field"><label>Inspection Type *</label><select id="qcScope"><option value="20%">20% Inspection</option><option value="100%">100% Inspection</option><option value="FIRE">Fire Inspection</option></select></div><div class="field"><label>Start date</label><input id="qcDate" type="date" value="${today()}"></div><div class="field"><label>Fiscal Year</label><input id="qcFY" value="${qFYDefault()}"></div><div class="field"><label>Quarter</label><select id="qcQ"><option>Q1</option><option>Q2</option><option>Q3</option><option>Q4</option></select></div></div><div class="notice"><b>Inspection population loads automatically.</b><div class="small">20% samples actual eMH rooms and loads standard common areas. 100% loads all rooms and standard common areas. Fire Inspection infers the building deck count from the room series and creates the four required fire categories on every deck.</div></div><button class="button full" id="qcCreate">Start Inspection</button></div>`);
 document.querySelector('#qcQ').value=qQuarterDefault();
 document.querySelector('#qcCreate').onclick=()=>{
   const building=val('qcBuilding'),inspector=val('qcInspector'),fy=val('qcFY').toUpperCase(),quarter=val('qcQ'),scope=val('qcScope'),base=qstate.buildings[building];
   if(!inspector)return showDialog('Building Manager required','Select the Building Manager / Inspector.');
   let snapshot=JSON.parse(JSON.stringify(base));
   const c={id:uid(),fy,quarter,scope,building,startDate:val('qcDate'),inspector,createdAt:new Date().toISOString(),inventorySnapshot:snapshot,commonSpacesNA:false,spaceIds:[],sampleDraft:[],sampleAccepted:false,substitutions:[]};
   if(scope==='FIRE'){
     c.inferredDeckCount=v083InferDeckCount(base);
     c.inventorySnapshot={...snapshot,spaces:v083FireSpaces(base)};
     c.spaceIds=c.inventorySnapshot.spaces.map(x=>x.id);c.sampleAccepted=true;
     c.sampleMethod=`Fire inspection: ${c.inferredDeckCount} deck(s) inferred from actual eMH room series; four required fire categories per deck`;
   }else{
     v082LoadCommonAreas(c);
     snapshot=JSON.parse(JSON.stringify(qstate.buildings[building]));c.inventorySnapshot=snapshot;
     const allCommon=(snapshot.spaces||[]).filter(x=>x.type!=='Bedroom').map(x=>x.id);
     if(scope==='100%'){c.spaceIds=(snapshot.spaces||[]).map(x=>x.id);c.sampleAccepted=true}
     else{const sample=qSample20(c);c.spaceIds=[...sample.bedIds,...allCommon];c.sampleDraft=[...sample.bedIds];c.sampleAccepted=true;c.sampleGeneratedAt=new Date().toISOString();c.sampleAcceptedAt=c.sampleGeneratedAt;c.sampleMethod='20% of actual eMH room roster, rounded up; proportional by deck; random within deck; standard common areas loaded automatically'}
   }
   qstate.cycles.unshift(c);qSave();qcycleId=c.id;closeDialog();qscreen='cycle';render();window.scrollTo(0,0);
 };
};

function v083FireCycleView(c){
 const s=qStats(c),pct=s.required?Math.round(s.done/s.required*100):0,b=qBuilding(c);
 const groups={};for(const sp of (b?.spaces||[])){(groups[sp.deck]??=[]).push(sp)}
 const rows=Object.keys(groups).sort((a,b)=>Number(a)-Number(b)).map(deck=>`<div class="card"><div class="page-head compact-head"><div><h3>${v083Ordinal(Number(deck))} Deck</h3><p>Required fire-safety categories</p></div></div>${groups[deck].map(sp=>{const r=s.ins.filter(x=>x.spaceId===sp.id).slice(-1)[0];return`<div class="record q-space-row"><span><b>${esc(v083FireCat(sp).label)}</b>${r?.fireLocation?`<div class="record-meta">${esc(r.fireLocation)}</div>`:''}</span><span class="q-row-actions">${r?`<b>${esc(r.result)}</b> <button class="button compact outline" data-action="q-inspect-space" data-id="${sp.id}">Edit</button>`:`<button class="button compact" data-action="q-inspect-space" data-id="${sp.id}">Inspect</button>`}</span></div>`}).join('')}</div>`).join('');
 return`<div class="page-head"><div><span class="badge">FIRE · ${esc(c.fy)} ${esc(c.quarter)}</span><h2>Building ${esc(c.building)} Fire Inspection</h2><p>${esc(c.inspector)} · ${c.inferredDeckCount||Object.keys(groups).length} deck(s) inferred from room series</p></div><div class="q-icon-actions"><button class="button compact outline" data-action="q-dashboard">All Inspections</button><button class="q-icon-btn danger-icon" data-action="q-delete-cycle" data-id="${c.id}" title="Delete this inspection">🗑️</button></div></div><div class="card q-progress-card"><div class="q-kpis"><b>${s.done}/${s.required}<small> completed</small></b><b>${s.remaining}<small> remaining</small></b><b>${s.pass}<small> pass</small></b><b>${s.fail}<small> deficiency</small></b></div><div class="progress"><i style="width:${pct}%"></i></div><div class="actions q-cycle-actions"><button class="button" data-action="q-next">Inspect Next</button><button class="button secondary" data-action="q-export-excel">Export Excel</button></div></div>${rows}`;
}
const _v083_cycle_base=qCycleView;
qCycleView=function(){const c=qCycle();return c?.scope==='FIRE'?v083FireCycleView(c):_v083_cycle_base()};

function v083FireInspectView(c,sp){
 const old=qstate.inspections.find(x=>x.id===qeditId)||qstate.inspections.filter(x=>x.cycleId===c.id&&x.spaceId===sp.id).slice(-1)[0];
 const cat=v083FireCat(sp),selected=old?.fireDeficiencies||[];
 const chips=cat.defs.map(x=>`<label class="def-chip ${selected.includes(x)?'selected':''}"><input type="checkbox" data-fire-def value="${esc(x)}" ${selected.includes(x)?'checked':''}><span>${esc(x)}</span></label>`).join('');
 return`<div class="page-head compact-head"><div><span class="badge">FIRE · ${esc(c.fy)} ${esc(c.quarter)}</span><h2>${esc(v083Ordinal(Number(sp.deck)))} Deck · ${esc(cat.label)}</h2><p>Building ${esc(c.building)} · ${esc(c.inspector)}</p></div><button class="button compact outline" data-action="q-back-cycle">Back</button></div><div class="card q-fast"><h3>Inspection Result</h3><div class="q-big-actions"><button class="button success" data-action="fire-pass">✓ PASS ALL & NEXT</button><button class="button danger" data-action="fire-deficiency">⚠ ADD DEFICIENCY</button></div><div id="fireDefPanel" class="${selected.length||old?.fireLocation||old?.woRequired?'':'hidden'}"><div class="field"><label>Exact Location *</label><input id="fireLocation" value="${esc(old?.fireLocation||'')}" placeholder="Example: East stairwell, 2nd deck center hall"></div><h4 class="criteria-title fail-title">Deficiency</h4><p class="small muted">Select every condition that applies at this location.</p><div class="chip-grid">${chips}</div><div class="field"><label>Inspector Note (optional)</label><textarea id="fireNote" placeholder="Add details needed to understand the deficiency">${esc(old?.manualComment||'')}</textarea></div><label class="wo-toggle"><input id="fireWO" type="checkbox" ${old?.woRequired?'checked':''}> <span>Work Order Required</span></label><div id="fireWONoteWrap" class="field ${old?.woRequired?'':'hidden'}"><label>Repair Needed / Work Order Note *</label><textarea id="fireWONote" placeholder="State exactly what needs to be repaired or corrected">${esc(old?.workOrderNote||'')}</textarea></div><button class="button full" data-action="fire-save-def">Save & Next Fire Item</button></div></div>`;
}
const _v083_inspect_base=qInspectView;
qInspectView=function(){const c=qCycle(),sp=(qBuilding(c)?.spaces||[]).find(x=>x.id===qspaceId);return c?.scope==='FIRE'&&sp?v083FireInspectView(c,sp):_v083_inspect_base()};

function v083SaveFire(pass=false){
 const c=qCycle(),sp=(qBuilding(c)?.spaces||[]).find(x=>x.id===qspaceId);if(!c||!sp)return;
 const existing=qstate.inspections.find(x=>x.id===qeditId)||qstate.inspections.find(x=>x.cycleId===c.id&&x.spaceId===sp.id);
 let defs=[],location='',note='',wo=false,woNote='';
 if(!pass){defs=[...document.querySelectorAll('[data-fire-def]:checked')].map(x=>x.value);location=val('fireLocation').trim();note=val('fireNote').trim();wo=!!document.querySelector('#fireWO')?.checked;woNote=val('fireWONote').trim();if(!location)return showDialog('Location required','Enter the exact location of the fire-safety deficiency.');if(!defs.length)return showDialog('Deficiency required','Select at least one deficiency.');if(wo&&!woNote)return showDialog('Repair note required','Enter what needs to be repaired or corrected before saving the work-order item.')}
 const rec={id:existing?.id||uid(),cycleId:c.id,date:today(),building:c.building,spaceId:sp.id,space:qSpaceLabel(sp),spaceType:'Fire Inspection',location:`${v083Ordinal(Number(sp.deck))} Deck`,fireDeck:Number(sp.deck),fireCategory:sp.fireCategory,fireCategoryLabel:v083FireCat(sp).label,fireLocation:location,result:pass?'PASS':'FAIL',failCriteria:pass?[]:defs,nonFailCriteria:[],fireDeficiencies:defs,manualComment:note,woRequired:wo,workOrderNote:woNote,inspector:c.inspector,updatedAt:new Date().toISOString()};
 if(existing)Object.assign(existing,rec);else qstate.inspections.push(rec);
 qstate.workOrders=qstate.workOrders.filter(w=>w.inspectionId!==rec.id);
 if(wo)qstate.workOrders.push({id:uid(),cycleId:c.id,inspectionId:rec.id,building:c.building,space:rec.space,deficiency:defs.join('; '),manualComment:note,workOrderNote:woNote,woNumber:'',status:'Needs Submission',dateSubmitted:'',dateCompleted:''});
 qSave();qGoNext(sp.id);
}

// FIRE export uses deck/category/location explicitly while keeping the standard workbook sheets.
const _v083_export_base=qExportExcel;
qExportExcel=function(){const c=qCycle();if(c?.scope!=='FIRE')return _v083_export_base();const s=qStats(c);const summary=[['Building','Deck','Fire Category','Result','Exact Location','Deficiencies','WO Required','Work Order Note','Inspector Note','Inspector','Date'],...s.ins.map(r=>[r.building,r.fireDeck,r.fireCategoryLabel||r.space,r.result,r.fireLocation||'',(r.fireDeficiencies||r.failCriteria||[]).join('; '),r.woRequired?'Yes':'No',r.workOrderNote||'',r.manualComment||'',r.inspector,r.date])];const deficiencies=[['Building','Deck','Fire Category','Exact Location','Deficiency','WO Required','Work Order Note','Inspector Note'],...s.ins.flatMap(r=>(r.fireDeficiencies||r.failCriteria||[]).map(x=>[r.building,r.fireDeck,r.fireCategoryLabel||r.space,r.fireLocation||'',x,r.woRequired?'Yes':'No',r.workOrderNote||'',r.manualComment||'']))];const wo=[['Building','Deck / Category','Deficiency','Exact Location / Inspector Note','Work Order Note','WO Number','Status','Date Submitted','Date Completed'],...s.wo.map(w=>{const i=qstate.inspections.find(x=>x.id===w.inspectionId);return[w.building,i?`${v083Ordinal(Number(i.fireDeck))} Deck · ${i.fireCategoryLabel}`:w.space,w.deficiency,i?.fireLocation||w.manualComment||'',w.workOrderNote||'',w.woNumber,w.status,w.dateSubmitted,w.dateCompleted]})];download(`Fire-Inspection-${c.fy}-${c.quarter}-Bldg-${c.building}.xlsx`,buildXlsx([{name:'FIRE INSPECTION',rows:summary},{name:'DEFICIENCIES',rows:deficiencies},{name:'WORK ORDERS REQUIRED',rows:wo}]))};

const _v083_bind_base=bind;
bind=function(){_v083_bind_base();const wo=document.querySelector('#fireWO');if(wo)wo.onchange=()=>document.querySelector('#fireWONoteWrap')?.classList.toggle('hidden',!wo.checked);document.querySelectorAll('[data-fire-def]').forEach(x=>x.onchange=()=>x.closest('.def-chip')?.classList.toggle('selected',x.checked))};
const _v083_action_base=action;
action=function(name,id){if(name==='fire-pass')return v083SaveFire(true);if(name==='fire-deficiency'){document.querySelector('#fireDefPanel')?.classList.remove('hidden');return}if(name==='fire-save-def')return v083SaveFire(false);return _v083_action_base(name,id)};


// Open to the Home launcher; Daily Log remains the first promoted action.
route='modules';

render();



/* ===== v0.8.6 checkout flow refinement ===== */
function v086AddDaysYmd(ymd,days){
  const p=String(ymd||today()).split('-').map(Number),d=new Date(p[0],(p[1]||1)-1,p[2]||1);d.setDate(d.getDate()+days);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

const v086StartViewBase=startView;
startView=function(type){
  let html=v086StartViewBase(type);
  if(type!=='Check-Out')return html;
  const p=checkoutPrefill;
  const defaultFinal=p?.scheduledFinalDate||v086AddDaysYmd(today(),7);
  const dateStatus=p?.scheduledFinalStatus||'Tentative';
  const stage=p?'Final Inspection':'Pre-Inspection';
  const block=`<div class="field full checkout-stage-box"><label>What are you doing today? *</label><div class="checkout-paths">
    <label class="checkout-path"><input type="radio" name="checkoutStage" value="Pre-Inspection" ${stage==='Pre-Inspection'?'checked':''}><span><b>PRE-INSPECTION</b><small>Inspect now and complete the Final Inspection later.</small></span></label>
    <label class="checkout-path"><input type="radio" name="checkoutStage" value="Final Inspection" ${stage==='Final Inspection'?'checked':''} ${p?'':'disabled'}><span><b>FINAL INSPECTION</b><small>${p?'Continue this completed Pre-Inspection.':'Start Final from Upcoming Final Inspections so it stays linked to the Pre-Inspection.'}</small></span></label>
    <label class="checkout-path"><input type="radio" name="checkoutStage" value="Pre + Final Today"><span><b>PRE + FINAL TODAY</b><small>Use when both stages are completed during the same appointment.</small></span></label>
  </div></div>
  <div class="field" id="scheduledFinalWrap"><label>Planned Final Inspection Date <span id="finalDateStatus" class="${dateStatus==='Scheduled'?'scheduled-chip':'tentative-chip'}">${dateStatus==='Scheduled'?'SCHEDULED':'TENTATIVE'}</span></label><input id="scheduledFinalDate" type="date" value="${esc(defaultFinal)}"><input id="scheduledFinalStatus" type="hidden" value="${esc(dateStatus)}"><small id="finalDateHelp">Defaults to 7 days after the Pre-Inspection when the actual Final date is not known. Change the date when confirmed.</small></div>
  <input id="checkoutCaseId" type="hidden" value="${esc(p?.checkoutCaseId||'')}">`;
  html=html.replace(/<div class="field full checkout-stage-box">[\s\S]*?<input id="checkoutCaseId" type="hidden" value="[^"]*">/,block);
  return html;
};

const v086BeginInspectionBase=beginInspection;
beginInspection=function(){
  const stage=document.querySelector('input[name="checkoutStage"]:checked')?.value||'Pre-Inspection';
  const dateStatus=val('scheduledFinalStatus')||'Tentative';
  const linkedPre=checkoutPrefill;
  v086BeginInspectionBase();
  if(draft?.type==='Check-Out'){
    draft.checkoutStage=stage;
    draft.checkoutMethod=stage==='Pre + Final Today'?'Pre + Final Same Visit':'Separate Pre + Final';
    draft.preInspectionDate=stage==='Final Inspection'?(linkedPre?.date||''):draft.date;
    draft.scheduledFinalStatus=stage==='Pre-Inspection'?dateStatus:(stage==='Pre + Final Today'?'Same Visit':(linkedPre?.scheduledFinalStatus||'Scheduled'));
    if(stage==='Pre + Final Today'){
      draft.scheduledFinalDate=draft.date;
      draft.finalInspectionDate=draft.date;
    } else if(stage==='Final Inspection'){
      draft.scheduledFinalDate=linkedPre?.scheduledFinalDate||draft.scheduledFinalDate||'';
      draft.finalInspectionDate=draft.date;
    }
    draft.checkoutStatus=stage==='Pre-Inspection'?'PRE COMPLETE — FINAL PENDING':(stage==='Final Inspection'?'FINAL IN PROGRESS':'FINAL IN PROGRESS');
    saveDraft();render();
  }
};

editorView=function(){
  let html=_v078_editorView();
  if(draft?.type!=='Check-Out')return html;
  const stage=draft.checkoutStage||'Pre-Inspection';
  const finalActive=stage==='Final Inspection'||stage==='Pre + Final Today';
  const status=stage==='Pre-Inspection'?'PRE-INSPECTION':stage==='Pre + Final Today'?'PRE + FINAL TODAY':'FINAL INSPECTION';
  const statusText=stage==='Pre-Inspection'
    ?`Final planned ${fmtDate(draft.scheduledFinalDate)} · ${draft.scheduledFinalStatus==='Scheduled'?'Scheduled':'Tentative 7-day default'}`
    :stage==='Pre + Final Today'?'Both checkout stages will be recorded from this one appointment.':'Linked to the prior Pre-Inspection. Complete Final Checkout Readiness before closing.';
  const info=`<div class="card checkout-process checkout-status-banner ${stage==='Pre + Final Today'?'same-visit-banner':''}"><div class="process-line"><span class="process-step active">1</span><span class="process-bar"></span><span class="process-step ${finalActive?'active':''}">2</span></div><div class="process-labels"><b>Pre-Inspection</b><b>Final Inspection</b></div><div class="notice"><b>${status}</b><div class="small">${statusText}</div></div></div>`;
  const readiness=finalActive?`<div class="card final-readiness"><h3>Final Checkout Readiness</h3><p class="small muted">Required for Final completion.</p>${[['personalPropertyRemoved','All personal property / gear removed'],['personalFurnitureRemoved','All personal furniture removed'],['trashRemoved','Trash and unwanted items removed'],['deepCleanComplete','Room deep cleaned']].map(([k,l])=>`<label class="readiness-check"><input type="checkbox" data-readiness="${k}" ${draft.finalReadiness?.[k]?'checked':''}> <span>${l}</span></label>`).join('')}</div>`:'';
  return info+readiness+html;
};

completeInspection=function(){
  if(draft?.type==='Check-Out'){
    const finalStage=draft.checkoutStage==='Final Inspection'||draft.checkoutStage==='Pre + Final Today';
    if(finalStage){
      const r=draft.finalReadiness||{};
      if(!r.personalPropertyRemoved||!r.personalFurnitureRemoved||!r.trashRemoved||!r.deepCleanComplete)return showDialog('Final checkout not ready','Confirm that all personal property/gear and personal furniture are removed, trash is removed, and the room is deep cleaned before completing the Final Inspection.');
      draft.checkoutStatus='CHECKOUT COMPLETE';
      draft.finalInspectionDate=draft.date;
    }else{
      draft.checkoutStatus='PRE COMPLETE — FINAL PENDING';
      draft.emhUpdated=false;
    }
  }
  _v078_completeInspection();
};

checkoutUpcoming=function(){
  const finals=new Set(state.records.filter(r=>r.type==='Check-Out'&&r.checkoutCaseId&&(r.checkoutStage==='Final Inspection'||r.checkoutStage==='Pre + Final Today')&&r.checkoutStatus==='CHECKOUT COMPLETE').map(r=>r.checkoutCaseId));
  return state.records.filter(r=>r.type==='Check-Out'&&r.checkoutStage==='Pre-Inspection'&&r.scheduledFinalDate&&r.checkoutCaseId&&!finals.has(r.checkoutCaseId)).sort((a,b)=>String(a.scheduledFinalDate).localeCompare(String(b.scheduledFinalDate)));
};

modulesView=function(){
  const pending=state.records.filter(r=>!r.emhUpdated).length,up=checkoutUpcoming();
  return`<section class="next-hero"><div class="next-hero-copy"><span class="next-badge">NEXT GENERATION · FUTENMA</span><h2>Ready for field operations</h2><p>Choose what you need. Daily Log is first for quick access, but nothing opens until you select it.</p></div><div class="runway-mark" aria-hidden="true"><span></span><span></span><span></span><span></span></div></section><div class="home-pills next-actions"><button class="home-pill primary" data-action="open-daily"><span class="home-icon">⌁</span><span>Daily Log<small>Fast activity entry and twice-monthly reporting</small></span><b class="pill-arrow">›</b></button><button class="home-pill" data-action="start-type" data-id="Check-Out"><span class="home-icon">⇤</span><span>Check-Out<small>Pre, linked Final, or Pre + Final Today</small></span><b class="pill-arrow">›</b></button><button class="home-pill" data-action="start-type" data-id="Check-In"><span class="home-icon">⇥</span><span>Check-In<small>Detailed room-condition inspection</small></span><b class="pill-arrow">›</b></button><button class="home-pill" data-action="open-quarterly"><span class="home-icon">◫</span><span>Inspections<small>20%, 100%, and Fire Inspection</small></span><b class="pill-arrow">›</b></button><button class="home-pill" data-action="start-type" data-id="Furniture-Issued"><span class="home-icon">▤</span><span>Furniture<small>Issued-item quantity and condition verification</small></span><b class="pill-arrow">›</b></button></div><div class="home-status next-status"><div class="status-head"><div><span class="status-kicker">TRANSFER STATUS</span><h3>Operational records</h3></div><span class="version-chip">v${esc(APP_VERSION)}</span></div><div class="status-grid"><div class="status-stat"><span>Completed</span><b>${state.records.length}</b></div><div class="status-stat"><span>Awaiting eMH</span><b>${pending}</b></div></div></div>${up.length?`<div class="card upcoming-card"><div class="page-head compact-head"><div><h3>Upcoming Final Inspections</h3><p>Tap Start Final to continue the linked checkout case. Tentative dates are 7-day planning defaults.</p></div></div>${up.slice(0,8).map(r=>`<div class="record upcoming-record"><span><b>${fmtDate(r.scheduledFinalDate)} · Bldg ${esc(r.building)} Room ${esc(r.room)}</b><div class="record-meta">${esc(r.formFields?.residentName||'')} · Pre ${fmtDate(r.date)} · <span class="status-tag ${r.scheduledFinalStatus==='Scheduled'?'scheduled':'tentative'}">${r.scheduledFinalStatus==='Scheduled'?'Scheduled':'Tentative'}</span></div></span><div class="upcoming-actions"><button class="button compact outline" data-action="reschedule-final" data-id="${r.id}">Change Date</button><button class="button compact" data-action="start-final" data-id="${r.id}">Start Final</button></div></div>`).join('')}</div>`:''}`;
};

const v086BindBase=bind;
bind=function(){
  v086BindBase();
  const updateCheckoutStart=()=>{
    const stage=document.querySelector('input[name="checkoutStage"]:checked')?.value||'Pre-Inspection';
    const w=document.querySelector('#scheduledFinalWrap');if(w)w.classList.toggle('hidden',stage!=='Pre-Inspection');
  };
  document.querySelectorAll('input[name="checkoutStage"]').forEach(x=>x.onchange=updateCheckoutStart);updateCheckoutStart();
  const d=document.querySelector('#scheduledFinalDate');if(d)d.onchange=()=>{const h=document.querySelector('#scheduledFinalStatus'),b=document.querySelector('#finalDateStatus'),help=document.querySelector('#finalDateHelp');if(h)h.value='Scheduled';if(b){b.className='scheduled-chip';b.textContent='SCHEDULED'}if(help)help.textContent='Confirmed/edited Final Inspection date.'};
};

const v086ActionBase=action;
action=function(name,id){
  if(name==='reschedule-final'){
    const pre=state.records.find(r=>r.id===id);if(!pre)return;
    showDialog('Change Final Inspection Date',`<div class="stack"><div class="field"><label>Final Inspection Date</label><input id="rescheduleFinalDate" type="date" value="${esc(pre.scheduledFinalDate||v086AddDaysYmd(pre.date||today(),7))}"></div><p class="small muted">Changing this date does not alter the completed Pre-Inspection.</p><button class="button full" id="saveFinalDate">Save Final Date</button></div>`);
    document.querySelector('#saveFinalDate').onclick=()=>{const d=val('rescheduleFinalDate');if(!d)return;pre.scheduledFinalDate=d;pre.scheduledFinalStatus='Scheduled';pre.updatedAt=new Date().toISOString();save();closeDialog();render()};return;
  }
  v086ActionBase(name,id);
};


/* ===== v1.0 production behavior ===== */
function showProcessing(message='Working…'){const o=document.querySelector('#processingOverlay'),t=document.querySelector('#processingText');if(t)t.textContent=message;if(o)o.classList.add('show')}
function hideProcessing(){document.querySelector('#processingOverlay')?.classList.remove('show')}

const v100EditorBase=editorView;
editorView=function(){
  let html=v100EditorBase();
  if(draft?.type!=='Check-Out'||!(draft.checkoutStage==='Final Inspection'||draft.checkoutStage==='Pre + Final Today'))return html;
  const card=`<div class="card final-note-card"><h3>Final Inspection Notes</h3><p class="small muted">Use this for checkout observations and context. Maintenance deficiencies should also be identified below as a Service Request.</p><div class="field"><label>Final Inspection Notes</label><textarea id="finalInspectionNotes" placeholder="Example: Resident removed remaining personal property; room deep cleaned.">${esc(draft.finalInspectionNotes||'')}</textarea></div><label class="wo-toggle sr-required-card"><input id="finalSRRequired" type="checkbox" ${draft.finalServiceRequestRequired?'checked':''}> <span>Service Request Required</span></label><div id="finalSRNoteWrap" class="field ${draft.finalServiceRequestRequired?'':'hidden'}"><label>Repair Needed / SR Note *</label><textarea id="finalSRNote" placeholder="State exactly what needs to be repaired or corrected">${esc(draft.finalServiceRequestNote||'')}</textarea></div></div>`;
  const marker='<div class="paper-form';
  const at=html.indexOf(marker);
  return at>=0?html.slice(0,at)+card+html.slice(at):card+html;
};

const v100BindBase=bind;
bind=function(){
  v100BindBase();
  const notes=document.querySelector('#finalInspectionNotes');if(notes)notes.oninput=()=>{draft.finalInspectionNotes=notes.value;saveDraft()};
  const sr=document.querySelector('#finalSRRequired');if(sr)sr.onchange=()=>{draft.finalServiceRequestRequired=sr.checked;document.querySelector('#finalSRNoteWrap')?.classList.toggle('hidden',!sr.checked);if(!sr.checked)draft.finalServiceRequestNote='';saveDraft()};
  const srn=document.querySelector('#finalSRNote');if(srn)srn.oninput=()=>{draft.finalServiceRequestNote=srn.value;saveDraft()};
};

const v100CompleteBase=completeInspection;
completeInspection=function(){
  if(draft?.type==='Check-Out'&&(draft.checkoutStage==='Final Inspection'||draft.checkoutStage==='Pre + Final Today')){
    draft.finalInspectionNotes=String(document.querySelector('#finalInspectionNotes')?.value??draft.finalInspectionNotes??'').trim();
    draft.finalServiceRequestRequired=!!document.querySelector('#finalSRRequired')?.checked;
    draft.finalServiceRequestNote=String(document.querySelector('#finalSRNote')?.value??draft.finalServiceRequestNote??'').trim();
    if(draft.finalServiceRequestRequired&&!draft.finalServiceRequestNote)return showDialog('Service Request note required','State what needs to be repaired or corrected before completing the Final Inspection.');
    if(draft.finalServiceRequestRequired&&!draft.followUp?.includes('Work Request Required'))draft.followUp=[...(draft.followUp||[]).filter(x=>x!=='None'),'Work Request Required'];
  }
  return v100CompleteBase();
};

const v100OpenRecordBase=openRecord;
openRecord=function(id){
  const r=state.records.find(x=>x.id===id);
  if(!r||r.type!=='Check-Out'||!(r.checkoutStage==='Final Inspection'||r.checkoutStage==='Pre + Final Today'))return v100OpenRecordBase(id);
  v100OpenRecordBase(id);
  const body=document.querySelector('#dialogBody');if(!body)return;
  const anchor=body.querySelector('.actions');
  const section=document.createElement('div');section.className='stack';section.style.marginTop='12px';
  const notes=String(r.finalInspectionNotes||'').trim(),sr=!!r.finalServiceRequestRequired,srn=String(r.finalServiceRequestNote||'').trim();
  section.innerHTML=`${notes?`<div class="notice"><b>Final Inspection Notes</b><div class="small">${esc(notes)}</div></div>`:''}${sr?`<div class="notice warn"><b>Service Request Required</b><div class="small">${esc(srn||'Repair/correction required.')}</div></div>`:''}`;
  if(section.innerHTML&&anchor)body.insertBefore(section,anchor);
};

const v100RenderBase=render;
render=function(){
  app.classList.remove('page-enter');
  v100RenderBase();
  requestAnimationFrame(()=>app.classList.add('page-enter'));
};

const v100PdfBase=exportInspectionPdf;
exportInspectionPdf=async function(record){showProcessing('Generating PDF…');try{return await v100PdfBase(record)}finally{hideProcessing()}};
const v100RangePdfBase=exportRangePdf;
exportRangePdf=async function(){showProcessing('Preparing PDF export…');try{return await v100RangePdfBase()}finally{hideProcessing()}};


/* ===== v1.0.1 Daily Log records / export ===== */
let dailyEditingId=null;

function v101DailyExcel(entries,label){
  const rows=[['Entry ID','Original Timestamp','Last Updated','Building Manager','Building','Room / Area','Activity','Duration Minutes','Note','Highlight'],
    ...entries.map(e=>[e.id||'',e.timestamp||'',e.updatedAt||'',e.inspector||'',e.building||'',e.roomArea||'',e.activity||'',e.durationMinutes||'',e.note||'',e.highlight?'Yes':'No'])];
  return buildXlsx([{name:'DAILY LOG',rows}]);
}
function v101ExportDailyExcel(all=false){
  const entries=all?[...dailyState.entries]:dailyPeriodEntries();
  const from=val('dailyFrom')||today(),through=val('dailyThrough')||today();
  const suffix=all?'ALL':`${from}-through-${through}`;
  download(`UH-Daily-Log-${suffix}.xlsx`,v101DailyExcel(entries,suffix));
}
dailyCsv=function(){
  const rows=[['Entry ID','Original Timestamp','Last Updated','Building Manager','Building','Room / Area','Activity','Duration Minutes','Note','Highlight'],
    ...dailyPeriodEntries().map(e=>[e.id||'',e.timestamp||'',e.updatedAt||'',e.inspector||'',e.building||'',e.roomArea||'',e.activity||'',e.durationMinutes||'',e.note||'',e.highlight?'Yes':'No'])];
  return rows.map(r=>r.map(v=>'"'+String(v??'').replaceAll('"','""')+'"').join(',')).join('\r\n');
};

dailyLogView=function(){
  const range=dailyDefaultRange(),entries=[...dailyState.entries].sort((a,b)=>String(b.timestamp).localeCompare(String(a.timestamp)));
  const edit=dailyEditingId?dailyState.entries.find(e=>e.id===dailyEditingId):null;
  if(dailyEditingId&&!edit)dailyEditingId=null;
  const inspector=edit?.inspector??dailyState.lastInspector??'',building=edit?.building??dailyState.lastBuilding??'',room=edit?.roomArea??'',activity=edit?.activity??'',dur=String(edit?.durationMinutes??15),note=edit?.note??'',highlight=!!edit?.highlight;
  const chips=[['5','5 min'],['10','10 min'],['15','15 min'],['30','30 min'],['45','45 min'],['60','1 hr'],['90','1.5 hr'],['120','2 hr+']];
  return`<div class="page-head"><div><span class="badge">${edit?'EDIT ENTRY':'FAST ENTRY'}</span><h2>Daily Log</h2><p>${edit?'Correct the record without changing its original timestamp.':'Log the work once; use it later for reporting and analysis.'}</p></div></div>
  <form id="dailyForm" class="card daily-form ${edit?'editing-record':''}">
    ${edit?`<div class="notice"><b>Editing saved entry</b><div class="small">Original: ${new Date(edit.timestamp).toLocaleString()} · ID ${esc(edit.id)}</div></div>`:''}
    <div class="form-grid">
      <div class="field"><label>Building Manager *</label><input id="dailyInspector" list="dailyBmList" value="${esc(inspector)}" required><datalist id="dailyBmList">${managerList().map(x=>`<option value="${esc(x)}">`).join('')}</datalist></div>
      <div class="field"><label>Building *</label><input id="dailyBuilding" list="dailyBuildingList" value="${esc(building)}" required><datalist id="dailyBuildingList">${buildingList().map(x=>`<option value="${esc(x)}">`).join('')}</datalist></div>
      <div class="field"><label>Room / Area</label><input id="dailyRoom" value="${esc(room)}" placeholder="Room, lounge, laundry, exterior…"></div>
      <div class="field"><label>Activity *</label><input id="dailyActivity" list="dailyActivityList" value="${esc(activity)}" required placeholder="Type or select"><datalist id="dailyActivityList">${DAILY_ACTIVITIES.map(x=>`<option value="${esc(x)}">`).join('')}</datalist></div>
    </div>
    <div class="field"><label>Estimated Duration *</label><div class="duration-chips">${chips.map(([v,l])=>`<label><input type="radio" name="dailyDuration" value="${v}" ${v===dur?'checked':''}><span>${l}</span></label>`).join('')}</div></div>
    <div class="field"><label>Note</label><textarea id="dailyNote" placeholder="Short operational note">${esc(note)}</textarea></div>
    <label class="highlight-toggle"><input id="dailyHighlight" type="checkbox" ${highlight?'checked':''}> <span>★ Highlight for twice-monthly summary</span></label>
    <div class="actions">${edit?`<button class="button" type="submit" data-daily-mode="update">Save Changes</button><button class="button outline" type="button" data-action="daily-cancel-edit">Cancel Edit</button>`:`<button class="button" type="submit" data-daily-mode="save">Save</button><button class="button secondary" type="submit" data-daily-mode="another">Save & Add Another</button>`}</div>
  </form>
  <div class="card daily-data-card"><div class="page-head compact-head"><div><h3>Daily Log Data & Reporting</h3><p>${dailyState.entries.length} saved entr${dailyState.entries.length===1?'y':'ies'} · Included in JSON Backup and Desktop Sync.</p></div></div>
    <div class="form-grid"><div class="field"><label>From</label><input id="dailyFrom" type="date" value="${range.start}"></div><div class="field"><label>Through</label><input id="dailyThrough" type="date" value="${range.end}"></div></div>
    <div class="actions"><button class="button secondary" data-action="daily-export">Export Period CSV</button><button class="button secondary" data-action="daily-export-excel">Export Period Excel</button><button class="button outline" data-action="daily-copy-summary">Copy Summary</button><button class="button outline" data-action="daily-export-all-excel">Export All Excel</button></div>
  </div>
  <div class="card"><div class="page-head compact-head"><div><h3>Daily Log Records</h3><p>Latest ${Math.min(entries.length,30)} shown. Use Edit to correct a saved entry; the original timestamp is preserved.</p></div></div>
    ${entries.length?entries.slice(0,30).map(e=>`<div class="record daily-record"><span><b>${new Date(e.timestamp).toLocaleString()} · Bldg ${esc(e.building)} ${esc(e.roomArea||'')}</b><div class="record-meta">${esc(e.activity)} · ${e.durationMinutes} min${e.highlight?' · ★ Highlight':''}${e.updatedAt?' · Edited':''}<br>${esc(e.note||'')}</div></span><div class="daily-record-actions"><button class="q-icon-btn" data-action="daily-edit" data-id="${e.id}" title="Edit Daily Log entry">✎</button><button class="q-icon-btn danger-icon" data-action="daily-delete" data-id="${e.id}" title="Delete Daily Log entry">🗑️</button></div></div>`).join(''):'<div class="empty">No Daily Log entries yet.</div>'}
  </div>`;
};

const v101BindBase=bind;
bind=function(){
  v101BindBase();
  const df=document.querySelector('#dailyForm');
  if(df){
    let mode=dailyEditingId?'update':'save';
    df.querySelectorAll('button[type="submit"]').forEach(b=>b.onclick=()=>mode=b.dataset.dailyMode||mode);
    df.onsubmit=e=>{
      e.preventDefault();
      const inspector=val('dailyInspector'),building=val('dailyBuilding'),activity=val('dailyActivity'),dur=Number(document.querySelector('input[name="dailyDuration"]:checked')?.value||0);
      if(!inspector||!building||!activity||!dur)return showDialog('Daily Log incomplete','Select the BM, building, activity, and duration.');
      const payload={inspector,building,roomArea:val('dailyRoom'),activity,durationMinutes:dur,note:val('dailyNote'),highlight:!!document.querySelector('#dailyHighlight')?.checked};
      if(dailyEditingId){
        const entry=dailyState.entries.find(x=>x.id===dailyEditingId);
        if(!entry)return showDialog('Entry not found','The Daily Log entry could not be found.');
        Object.assign(entry,payload,{updatedAt:new Date().toISOString()});
        dailyEditingId=null;
      }else{
        dailyState.entries.push({id:uid(),timestamp:new Date().toISOString(),...payload});
      }
      dailyState.lastInspector=inspector;dailyState.lastBuilding=building;dailySave();render();
      if(mode==='another'&&!dailyEditingId)setTimeout(()=>document.querySelector('#dailyActivity')?.focus(),0);
    };
  }
};

const v101ActionBase=action;
action=function(name,id){
  if(name==='daily-edit'){dailyEditingId=id;route='daily';render();setTimeout(()=>window.scrollTo({top:0,behavior:'smooth'}),0);return}
  if(name==='daily-cancel-edit'){dailyEditingId=null;render();return}
  if(name==='daily-export-excel'){v101ExportDailyExcel(false);return}
  if(name==='daily-export-all-excel'){v101ExportDailyExcel(true);return}
  if(name==='daily-delete'&&dailyEditingId===id)dailyEditingId=null;
  return v101ActionBase(name,id);
};



/* ===== v1.0.2 Release Candidate: Daily Log priority + Escort/QC + Building Roster Manager ===== */
const V102_DAILY_ACTIVITIES=[
  'Escort','Lock Service','Appliance','QC / Repair Verification','Maintenance / Work Order','Room Inspection','Check-In','Check-Out','Room Transfer','Key Service','Common Area / Walkthrough','Property / Furniture','Occupancy / Vacancy Verification','Resident Support','Leadership / Unit Coordination','Administrative','Other'
];
const V102_ESCORT_RESULTS=['Escort Only','Escort + QC'];

function v102DailyExcel(entries){
  const rows=[['Entry ID','Original Timestamp','Last Updated','Building Manager','Building','Room / Area','Activity','Sub-Activity / Result','Duration Minutes','Note','Highlight'],
    ...entries.map(e=>[e.id||'',e.timestamp||'',e.updatedAt||'',e.inspector||'',e.building||'',e.roomArea||'',e.activity||'',e.subActivity||'',e.durationMinutes||'',e.note||'',e.highlight?'Yes':'No'])];
  return buildXlsx([{name:'DAILY LOG',rows}]);
}
v101DailyExcel=v102DailyExcel;
dailyCsv=function(){
  const rows=[['Entry ID','Original Timestamp','Last Updated','Building Manager','Building','Room / Area','Activity','Sub-Activity / Result','Duration Minutes','Note','Highlight'],
    ...dailyPeriodEntries().map(e=>[e.id||'',e.timestamp||'',e.updatedAt||'',e.inspector||'',e.building||'',e.roomArea||'',e.activity||'',e.subActivity||'',e.durationMinutes||'',e.note||'',e.highlight?'Yes':'No'])];
  return rows.map(r=>r.map(v=>'"'+String(v??'').replaceAll('"','""')+'"').join(',')).join('\r\n');
};

dailyLogView=function(){
  const range=dailyDefaultRange(),entries=[...dailyState.entries].sort((a,b)=>String(b.timestamp).localeCompare(String(a.timestamp)));
  const edit=dailyEditingId?dailyState.entries.find(e=>e.id===dailyEditingId):null;
  if(dailyEditingId&&!edit)dailyEditingId=null;
  const inspector=edit?.inspector??dailyState.lastInspector??'',building=edit?.building??dailyState.lastBuilding??'',room=edit?.roomArea??'',activity=edit?.activity??'',subActivity=edit?.subActivity??'',dur=String(edit?.durationMinutes??15),note=edit?.note??'',highlight=!!edit?.highlight;
  const chips=[['5','5 min'],['10','10 min'],['15','15 min'],['30','30 min'],['45','45 min'],['60','1 hr'],['90','1.5 hr'],['120','2 hr+']];
  const escortBlock=`<div id="dailyEscortResultWrap" class="field ${activity==='Escort'?'':'hidden'}"><label>Escort Result *</label><div class="duration-chips escort-result-chips">${V102_ESCORT_RESULTS.map(v=>`<label><input type="radio" name="dailyEscortResult" value="${esc(v)}" ${subActivity===v||(activity==='Escort'&&!subActivity&&v==='Escort Only')?'checked':''}><span>${esc(v)}</span></label>`).join('')}</div><p class="small muted">Use <b>Escort + QC</b> when you escort maintenance and verify the completed repair during the same visit. Use <b>QC / Repair Verification</b> as the Activity when you return only to verify a repair.</p></div>`;
  return`<div class="page-head"><div><span class="badge">${edit?'EDIT ENTRY':'FAST ENTRY'}</span><h2>Daily Log</h2><p>${edit?'Correct the record without changing its original timestamp.':'Log the work once; use it later for reporting and analysis.'}</p></div></div>
  <form id="dailyForm" class="card daily-form ${edit?'editing-record':''}">
    ${edit?`<div class="notice"><b>Editing saved entry</b><div class="small">Original: ${new Date(edit.timestamp).toLocaleString()} · ID ${esc(edit.id)}</div></div>`:''}
    <div class="form-grid">
      <div class="field"><label>Building Manager *</label><input id="dailyInspector" list="dailyBmList" value="${esc(inspector)}" required><datalist id="dailyBmList">${managerList().map(x=>`<option value="${esc(x)}">`).join('')}</datalist></div>
      <div class="field"><label>Building *</label><input id="dailyBuilding" list="dailyBuildingList" value="${esc(building)}" required><datalist id="dailyBuildingList">${buildingList().map(x=>`<option value="${esc(x)}">`).join('')}</datalist></div>
      <div class="field"><label>Room / Area</label><input id="dailyRoom" value="${esc(room)}" placeholder="Room, lounge, laundry, exterior…"></div>
      <div class="field"><label>Activity *</label><input id="dailyActivity" list="dailyActivityList" value="${esc(activity)}" required placeholder="Type or select"><datalist id="dailyActivityList">${V102_DAILY_ACTIVITIES.map(x=>`<option value="${esc(x)}">`).join('')}</datalist><p class="small muted">Most-used choices are listed first: Escort, Lock Service, Appliance, and QC / Repair Verification.</p></div>
    </div>
    ${escortBlock}
    <div class="field"><label>Estimated Duration *</label><div class="duration-chips">${chips.map(([v,l])=>`<label><input type="radio" name="dailyDuration" value="${v}" ${v===dur?'checked':''}><span>${l}</span></label>`).join('')}</div></div>
    <div class="field"><label>Note</label><textarea id="dailyNote" placeholder="Short operational note">${esc(note)}</textarea></div>
    <label class="highlight-toggle"><input id="dailyHighlight" type="checkbox" ${highlight?'checked':''}> <span>★ Highlight for twice-monthly summary</span></label>
    <div class="actions">${edit?`<button class="button" type="submit" data-daily-mode="update">Save Changes</button><button class="button outline" type="button" data-action="daily-cancel-edit">Cancel Edit</button>`:`<button class="button" type="submit" data-daily-mode="save">Save</button><button class="button secondary" type="submit" data-daily-mode="another">Save & Add Another</button>`}</div>
  </form>
  <div class="card daily-data-card"><div class="page-head compact-head"><div><h3>Daily Log Data & Reporting</h3><p>${dailyState.entries.length} saved entr${dailyState.entries.length===1?'y':'ies'} · Included in JSON Backup and Desktop Sync.</p></div></div>
    <div class="form-grid"><div class="field"><label>From</label><input id="dailyFrom" type="date" value="${range.start}"></div><div class="field"><label>Through</label><input id="dailyThrough" type="date" value="${range.end}"></div></div>
    <div class="actions"><button class="button secondary" data-action="daily-export">Export Period CSV</button><button class="button secondary" data-action="daily-export-excel">Export Period Excel</button><button class="button outline" data-action="daily-copy-summary">Copy Summary</button><button class="button outline" data-action="daily-export-all-excel">Export All Excel</button></div>
  </div>
  <div class="card"><div class="page-head compact-head"><div><h3>Daily Log Records</h3><p>Latest ${Math.min(entries.length,30)} shown. Use Edit to correct a saved entry; the original timestamp is preserved.</p></div></div>
    ${entries.length?entries.slice(0,30).map(e=>`<div class="record daily-record"><span><b>${new Date(e.timestamp).toLocaleString()} · Bldg ${esc(e.building)} ${esc(e.roomArea||'')}</b><div class="record-meta">${esc(e.activity)}${e.subActivity?' · '+esc(e.subActivity):''} · ${e.durationMinutes} min${e.highlight?' · ★ Highlight':''}${e.updatedAt?' · Edited':''}<br>${esc(e.note||'')}</div></span><div class="daily-record-actions"><button class="q-icon-btn" data-action="daily-edit" data-id="${e.id}" title="Edit Daily Log entry">✎</button><button class="q-icon-btn danger-icon" data-action="daily-delete" data-id="${e.id}" title="Delete Daily Log entry">🗑️</button></div></div>`).join(''):'<div class="empty">No Daily Log entries yet.</div>'}
  </div>`;
};

function v102RosterRooms(building){
  return (qstate.buildings[String(building)]?.spaces||[]).filter(s=>s.type==='Bedroom').map(s=>String(s.designation||'')).filter(Boolean).sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));
}
function v102ParseRooms(text){
  return [...new Set(String(text||'').split(/[\s,;]+/).map(x=>x.trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));
}
function v102SyncBuildingList(){
  state.settings.buildings=Object.keys(qstate.buildings||{}).sort((a,b)=>a.localeCompare(b,undefined,{numeric:true})).join('\n');
  state.settings.bmAssignments='';save();
}
function v102SaveRoster(number,rooms){
  number=String(number||'').trim();rooms=v102ParseRooms(rooms);
  if(!number)return showDialog('Building required','Enter the building number.');
  if(!rooms.length)return showDialog('Room roster required','Paste at least one real room number for this building.');
  qstate.buildings[number]=v080MakeBuilding(number,rooms);qSave();v102SyncBuildingList();
  showDialog('Building roster saved',`Building <b>${esc(number)}</b> now has <b>${rooms.length}</b> physical rooms. Existing inspection cycles retain their saved snapshots.`);render();
}
function v102CsvLine(line){let out=[],cur='',q=false;for(let i=0;i<line.length;i++){const c=line[i];if(c==='"'){if(q&&line[i+1]==='"'){cur+='"';i++}else q=!q}else if(c===','&&!q){out.push(cur.trim());cur=''}else cur+=c}out.push(cur.trim());return out}
async function v102ImportRosterCsv(file,selectedBuilding){
  if(!file)return;
  try{
    const lines=(await file.text()).split(/\r?\n/).filter(x=>x.trim());if(!lines.length)throw Error();
    const rows=lines.map(v102CsvLine),head=rows[0].map(x=>x.toLowerCase().trim());
    const bi=head.findIndex(x=>x==='building'||x.includes('building number')||x.includes('bldg'));
    const ri=head.findIndex(x=>x==='room'||x.includes('room number')||x.includes('room designation'));
    const groups={};
    if(ri>=0){for(const row of rows.slice(1)){const b=bi>=0?String(row[bi]||'').trim():String(selectedBuilding||'').trim(),room=String(row[ri]||'').trim();if(b&&room)(groups[b]??=[]).push(room)}}
    else {const b=String(selectedBuilding||'').trim();if(!b)return showDialog('Building required','Choose/enter a building before importing a room-only CSV.');groups[b]=rows.map(r=>r[0]).filter(Boolean)}
    const keys=Object.keys(groups);if(!keys.length)throw Error();
    keys.forEach(b=>{const rooms=v102ParseRooms(groups[b].join('\n'));if(rooms.length)qstate.buildings[b]=v080MakeBuilding(b,rooms)});qSave();v102SyncBuildingList();render();showDialog('Room roster imported',`Imported room rosters for ${keys.length} building${keys.length===1?'':'s'}.`)
  }catch{showDialog('Import failed','Use a CSV with Building and Room columns, or select a building and import a one-column room list.')}
}
function v102ExportBuildingMaster(){
  const rows=[['Building','Room']];Object.keys(qstate.buildings||{}).sort((a,b)=>a.localeCompare(b,undefined,{numeric:true})).forEach(b=>v102RosterRooms(b).forEach(r=>rows.push([b,r])));
  const csv=rows.map(r=>r.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')).join('\r\n');download(`UH-Building-Master-${today()}.csv`,new Blob([csv],{type:'text/csv'}));
}

settingsView=function(){const crit=qCriteria(),known=Object.keys(qstate.buildings||{}).sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));return`<div class="page-head"><div><h2>Settings</h2><p>Team roster, building room rosters, inspection criteria, updates, and local data.</p></div></div><div class="stack">
<form id="settingsForm" class="card form-grid"><div class="field"><label>Installation</label><input id="setInstallation" value="${esc(state.settings.installation)}"></div><div class="field"><label>Installation code</label><input id="setInstallationCode" value="${esc(state.settings.installationCode||'FT')}" maxlength="4"></div><div class="field full"><label>Building Managers</label><textarea id="setBuildingManagers" class="roster-input">${esc(state.settings.buildingManagers||'')}</textarea><p class="small muted">One name per line. Buildings are not assigned to a default BM; the BM is selected when the action is performed.</p></div><input id="setInspector" type="hidden" value=""><input id="setBuildings" type="hidden" value="${esc(state.settings.buildings||'')}"><input id="setBmAssignments" type="hidden" value=""><div class="field full"><label>20% / 100% — FAIL Criteria</label><textarea id="setQFail" class="criteria-editor">${esc(crit.fail.join('\n'))}</textarea><p class="small muted">One criterion per line. Changes apply to new inspections; completed records retain their selected text.</p></div><div class="field full"><label>20% / 100% — PASS W/CONDITION Criteria</label><textarea id="setQNonfail" class="criteria-editor">${esc(crit.nonfail.join('\n'))}</textarea></div><div class="field full"><button class="button" type="submit">Save Settings</button></div></form>
<div class="card roster-manager"><div class="page-head compact-head"><div><h3>Building & Room Roster Manager</h3><p>Add future buildings without an app update. Store only physical rooms—not occupancy or active/inactive status.</p></div></div><div class="form-grid"><div class="field"><label>Building number</label><input id="rosterBuilding" list="rosterBuildingList" placeholder="e.g., 415"><datalist id="rosterBuildingList">${known.map(b=>`<option value="${esc(b)}">`).join('')}</datalist></div><div class="field"><label>Known buildings</label><select id="rosterKnown"><option value="">Select to load…</option>${known.map(b=>`<option value="${esc(b)}">${esc(b)} · ${v102RosterRooms(b).length} rooms</option>`).join('')}</select></div><div class="field full"><label>Physical room roster</label><textarea id="rosterRooms" class="roster-input" placeholder="101\n102\n103\n201\n202"></textarea><p class="small muted">Paste one room per line, or separate rooms with commas/spaces. Skipped room numbers are preserved because the app uses only what you enter.</p></div></div><div class="actions"><button class="button" data-action="roster-save">Save / Update Building</button><label class="button secondary" style="cursor:pointer">Import CSV<input id="rosterCsvImport" type="file" accept="text/csv,.csv" hidden></label><button class="button outline" data-action="roster-export">Export Building Master CSV</button><button class="button danger" data-action="roster-delete">Delete Building</button></div><div id="rosterStatus" class="small muted" style="margin-top:10px">${known.length} buildings currently loaded.</div></div>
<div class="card update-card"><h3>App Update</h3><p class="small muted">Installed version: <b>${esc(APP_VERSION)}</b>. Updates are delivered through the installed web app.</p><button class="button secondary" data-action="check-update">Check for Update</button></div><div class="card"><h3>Local Data</h3><p class="small muted">Export a JSON backup before changing devices or clearing browser data.</p><div class="actions"><button class="button" data-action="export-all">Export Detailed Inspections Excel</button><button class="button secondary" data-action="backup">Export JSON Backup</button><label class="button outline" style="cursor:pointer">Import JSON Backup<input id="restoreBackup" type="file" accept="application/json,.json" hidden></label><button class="button danger" data-action="clear-data">Erase All Data</button></div></div></div>`};

const v102BindBase=bind;
bind=function(){
  v102BindBase();
  const act=document.querySelector('#dailyActivity'),wrap=document.querySelector('#dailyEscortResultWrap');
  if(act&&wrap){const sync=()=>wrap.classList.toggle('hidden',act.value!=='Escort');act.addEventListener('input',sync);act.addEventListener('change',sync);sync()}
  const df=document.querySelector('#dailyForm');
  if(df){let mode=dailyEditingId?'update':'save';df.querySelectorAll('button[type="submit"]').forEach(b=>b.onclick=()=>mode=b.dataset.dailyMode||mode);df.onsubmit=e=>{e.preventDefault();const inspector=val('dailyInspector'),building=val('dailyBuilding'),activity=val('dailyActivity'),dur=Number(document.querySelector('input[name="dailyDuration"]:checked')?.value||0);if(!inspector||!building||!activity||!dur)return showDialog('Daily Log incomplete','Select the BM, building, activity, and duration.');let subActivity='';if(activity==='Escort'){subActivity=document.querySelector('input[name="dailyEscortResult"]:checked')?.value||'';if(!subActivity)return showDialog('Escort result required','Select Escort Only or Escort + QC.')}const payload={inspector,building,roomArea:val('dailyRoom'),activity,subActivity,durationMinutes:dur,note:val('dailyNote'),highlight:!!document.querySelector('#dailyHighlight')?.checked};if(dailyEditingId){const entry=dailyState.entries.find(x=>x.id===dailyEditingId);if(!entry)return showDialog('Entry not found','The Daily Log entry could not be found.');Object.assign(entry,payload,{updatedAt:new Date().toISOString()});dailyEditingId=null}else dailyState.entries.push({id:uid(),timestamp:new Date().toISOString(),...payload});dailyState.lastInspector=inspector;dailyState.lastBuilding=building;dailySave();render();if(mode==='another')setTimeout(()=>document.querySelector('#dailyActivity')?.focus(),0)}}
  const known=document.querySelector('#rosterKnown'),building=document.querySelector('#rosterBuilding'),rooms=document.querySelector('#rosterRooms');
  const loadRoster=()=>{const b=(known?.value||building?.value||'').trim();if(!b)return;if(building)building.value=b;if(rooms)rooms.value=v102RosterRooms(b).join('\n');const status=document.querySelector('#rosterStatus');if(status){const rs=v102RosterRooms(b),decks=[...new Set(rs.map(r=>String(r)[0]).filter(x=>/\d/.test(x)))];status.textContent=`Building ${b}: ${rs.length} rooms · inferred ${decks.length||0} deck${decks.length===1?'':'s'}.`}};
  if(known)known.onchange=loadRoster;if(building)building.onchange=loadRoster;
  const imp=document.querySelector('#rosterCsvImport');if(imp)imp.onchange=e=>v102ImportRosterCsv(e.target.files?.[0],val('rosterBuilding'));
};

const v102ActionBase=action;
action=function(name,id){
  if(name==='roster-save'){v102SaveRoster(val('rosterBuilding'),document.querySelector('#rosterRooms')?.value||'');return}
  if(name==='roster-export'){v102ExportBuildingMaster();return}
  if(name==='roster-delete'){const b=val('rosterBuilding');if(!b)return showDialog('Building required','Choose a building first.');if(confirm(`Delete Building ${b} from the current Building Master? Existing inspection cycles keep their saved snapshots.`)){delete qstate.buildings[b];qSave();v102SyncBuildingList();render()}return}
  return v102ActionBase(name,id);
};

(function productionLaunch(){
  const s=document.querySelector('#launchSplash');if(!s)return;
  let closed=false;
  const close=()=>{if(closed)return;closed=true;s.classList.add('hide');setTimeout(()=>s.remove(),420)};
  const timer=setTimeout(close,3200);
  s.addEventListener('click',()=>{clearTimeout(timer);close()},{once:true});
})();

render();


