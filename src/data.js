/* ===== MA'LUMOTLAR (o'zingizniki bilan almashtiring) ===== */
export const CATS={
  ayollar:{t:'Ayollar',e:'👗',h:340,sizes:['XS','S','M','L','XL']},
  erkaklar:{t:'Erkaklar',e:'🧥',h:215,sizes:['S','M','L','XL','XXL']},
  bolalar:{t:'Bolalar',e:'🧸',h:35,sizes:['2-3','4-5','6-7','8-10','11-13']},
  poyabzal:{t:'Poyabzal',e:'👟',h:160,sizes:['36','37','38','39','40','41','42','43','44']},
  aksessuarlar:{t:'Aksessuarlar',e:'👜',h:270,sizes:[]},
  sale:{t:'Chegirmalar',e:'🏷️',h:5,sizes:[]},
  yangi:{t:'Yangi kelganlar',e:'✨',h:50,sizes:[]}
};
// [kategoriya, nom, emoji, narx (ming so'm), eski narx (ming), yangi?]
const RAW=[
['ayollar',"Yozgi gulli ko'ylak",'👗',289,0,1],['ayollar','Ipak bluzka','👚',179,229,0],['ayollar','Keng jinsi shim','👖',249,0,0],['ayollar','Klassik palto','🧥',690,890,0],
['ayollar','Kechki libos','👗',590,0,1],['ayollar','Trikotaj kardigan','🧶',259,0,0],['ayollar','Plisse yubka','👗',199,0,0],['ayollar','Sport kostyum','🎽',329,429,0],
['erkaklar',"Oq klassik ko'ylak",'👔',219,0,0],['erkaklar','Oversize futbolka','👕',119,159,0],['erkaklar','Chinos shim','👖',239,0,1],['erkaklar','Qishki kurtka','🧥',790,990,0],
['erkaklar','Bomber kurtka','🧥',459,0,1],['erkaklar','Yung sviter','🧶',299,0,0],['erkaklar','Yozgi shorti','🩳',139,0,0],['erkaklar','Biznes kostyum','🤵',1190,0,0],
['bolalar',"Chaqaloq to'plami",'👶',149,0,1],['bolalar','Qizlar libosi','👗',169,219,0],['bolalar',"O'g'il bolalar kombinezoni",'🧒',189,0,0],['bolalar','Maktab formasi','🎒',259,0,0],
['bolalar','Issiq kombinezon','🧥',349,449,0],['bolalar','Bolalar futbolkasi','👕',69,0,1],['bolalar','Yumshoq pijama','🧸',129,0,0],['bolalar','Yoz panamasi','🧢',59,0,0],
['poyabzal','Oq krossovka','👟',459,0,1],['poyabzal','Sport krossovka','👟',529,649,0],['poyabzal','Charm tufli','👞',590,0,0],['poyabzal','Baland poshnali tufli','👠',390,0,0],
['poyabzal','Qishki etik','🥾',690,890,0],['poyabzal','Yozgi sandal','🩴',199,0,1],['poyabzal','Ayollar etigi','👢',520,0,0],['poyabzal','Mokasin','👞',420,0,0],
['aksessuarlar','Charm sumka','👜',390,0,1],['aksessuarlar',"Qo'l soati",'⌚',690,890,0],['aksessuarlar',"Quyoshdan ko'zoynak",'🕶️',149,0,0],['aksessuarlar','Yozgi shlyapa','👒',99,0,1],
['aksessuarlar','Jun sharf','🧣',129,0,0],['aksessuarlar','Ryukzak','🎒',259,329,0],['aksessuarlar','Charm hamyon','👛',189,0,0],['aksessuarlar',"Zargarlik to'plami",'💍',320,0,0]
];
export const COLORS=['#1b1d26','#b88a3b','#4d6bd6','#d96a7a','#3f8f6b','#8d8f99'];
export const P=RAW.map((r,i)=>{const c=CATS[r[0]];
  return{id:i,cat:r[0],n:r[1],e:r[2],price:r[3]*1000,old:r[4]*1000,isNew:!!r[5],
    bgh:(c.h+(i*17)%40)%360,
    sz:c.sizes.filter((s,k)=>(i+k)%5!==0),            // mavjud o'lchamlar
    col:[0,1,2].map(k=>COLORS[(i+k*2)%6])};});


export const NAV=['ayollar','erkaklar','bolalar','poyabzal','aksessuarlar','sale'];
export const fmt=n=>n.toLocaleString('ru-RU').replace(/\u00a0/g,' ')+" so'm";
export const inCat=s=>s==='sale'?P.filter(p=>p.old):s==='yangi'?P.filter(p=>p.isNew):P.filter(p=>p.cat===s);
