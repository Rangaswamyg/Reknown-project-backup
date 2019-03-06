import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';
import { IndexService } from '../services/index.service';
import { FormBuilder, FormGroup, Validators, FormArray,FormControl } from '@angular/forms';

declare var $:any;
declare var jQuery: any;
@Component({
  selector: 'app-comparisonpage',
  templateUrl: './comparisonpage.component.html',
  styleUrls: ['./comparisonpage.component.css']
})
export class ComparisonpageComponent implements OnInit {
  conname:any;
  msg:any;
  form: FormGroup;
  showDropdown=false;
  showDropdown1=false;
  showDropdown2=false;
  truncating = true;
  urluni='';
  urlloc='';
  urlcon='';
  limit:number = 1000;
  sample=[];
    compAdd:boolean=false;
  countryName= [];
  universityName= [];
  locationList=[];
  universitypagedata=[];
  search:any;
 // optionSelected= this.universityName['Add university'];
 // filterdata;
  constructor(private _router: Router,private route:ActivatedRoute,public _indexservice: IndexService, private http: HttpClient,private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      search:[null],
       locationsearch:[null],
       universitysearch:[null]
     });
   }

  ngOnInit() {
    //  if(this._indexservice.comparableList[0].length>=3)
    // {
    //   return;
    // }else{
    //  this.compAdd=true;
    // }
    this.compAdd=true;
    //  console.log("wincdjsfhjdshfjd",window.location.search);
    // this.route.snapshot.params.get(params=>{
    //   var uid = params['this._probabilityService.universitySelected'];
    //   var lid= params['this._probabilityService.locSelected.id'];
    //   var cid = params['this._probabilityService.countrySelected.id'];
    //   console.log("dfgdhfdfhhfhdhfdf",uid,lid,cid)
    //   //  this.getUniversityCompare(uid,lid,cid)
    // });
    this.urluni = this.route.snapshot.paramMap.get('uid')
    this.urlloc =this.route.snapshot.paramMap.get('lid')
    this.urlcon = this.route.snapshot.paramMap.get('cid')
    console.log("uniurlllllllll",this.urluni ,"dfnkf",this.urlloc, "dsjfh",this.urlcon);
    this.getUniversityCompare(this.urluni,this.urlloc,this.urlcon);

    
this.getCountryDropdown();
// this.getUniversityDropDown();
  }
  getUniversityCompare(urluni,urlloc,urlcon){
    return this.http.get('http://localhost:8000/test/comparision_page_add_uni/'+urluni +'/' +urlloc+ '/' +urlcon).subscribe(data =>{
      this._indexservice.comparableList=new Array(data);
      if (this._indexservice.comparableList[0].length == 3) {
        this.compAdd = false;

      }
      // console.log("universitypage",this.universitypagedata );
      // this._indexservice.comparableList.push(this.universitypagedata);
      //   console.log('pushed items',this._indexservice.comparableList);
  
      
   
      
       
        // localStorage.setItem('storeObj', JSON.stringify({local_ok:this._indexservice.comparableList}));
      console.log('pushed items', this._indexservice.comparableList);

      

    });
  }
  
    
  
  // getUniversityDropDown(){
  //   this._indexservice.list().subscribe(data=>{
  //     this.universityName=data;
  //     console.log("universityName", this.universityName)

  //   }) ;
  // }
  getCountryDropdown(){
    this._indexservice.countryComparision().subscribe(data=>{
          this.countryName=data;
          console.log("countryName", this.countryName)

        }) ;
  }
  // getUniversityCompare(){
  //   this._indexservice.universityCompare().subscribe(data=>{
  //     this.universityName=data;
  //     console.log("universityName", this.universityName)
  //   })
  // }

 
  // onchangeDropdownCountry(conObj) {
  //   console.log(conObj);
  //   this._indexservice.countrySelected = conObj;
  //   console.log("getCountryId", this._indexservice.countrySelected);
  //   for (var item of this.countryName) {
  //     if (item.id == this._indexservice.countrySelected) {
  //       this.locationList = item.records;
  //       console.log("ItemLocdata", item.records);
  //     }
  //   }
  //   console.log("countryData", this.countryName);
  // }

  // onchangeDropdownLocation(locObj) {
  //   this._indexservice.locSelected = locObj;
  //   console.log("getLocationId", this._indexservice.locSelected);
  //   for (var itemU of this.locationList) {
  //     if (itemU.id == this._indexservice.locSelected) {
  //       this.universityName = itemU.uni;
  //       console.log("ItemUnidata", itemU.uni);
  //     }
  //   }
  // }

//  onchangeDropdownUniversity(uniObj)
//  {
//    console.log(uniObj);
//    this._indexservice.universitySelected = uniObj;
//    console.log("getfirst", this._indexservice.universitySelected);
//    console.log("ListOfUniversityFilter",typeof(this._indexservice.comparableList));
//    this.getUniversityCompare(this._indexservice.universitySelected,this._indexservice.locSelected,this._indexservice.countrySelected);
//  }


  remove(index) {
    console.log('Index', index);
    if (this._indexservice.comparableList[0].length >= 1) {
      this._indexservice.comparableList[0].splice(index, 1);
      this.getCountryDropdown();
      this.compAdd = true;
      for(var i in this._indexservice.comparableList[0]){
        if(i==index){
          this._indexservice.comparableList[0].splice(i,1);
          let url_univ=this.urluni.split("-");
          var url_loca=this.urlloc.split("-");
          var url_conn=this.urlcon.split("-");
          for (var j in new Array(url_univ)[0]){
              if(j==i){
                url_univ.splice(parseInt(i),1)
                url_loca.splice(parseInt(i),1)
                url_conn.splice(parseInt(i),1)
                for(var k in url_univ){
                  if(parseInt(k)==0){
                    this.urluni=k
                    this.urlloc=url_loca[k];
                    this.urlcon=url_conn[k];
                  }
                  else{
                    this.urluni+="-"+k;
                    this.urlloc+="-"+url_loca[k];
                    this.urlcon+="-"+url_conn[k];
                  } 
                  
                }

              }
          }
          console.log(this.urlcon,this.urlloc,this.urluni)
          console.log("after rremove",this._indexservice.comparableList[0])

        }
      }
      console.log("after rremove",this._indexservice.comparableList[0])
    }
    else {
      return;
    }
  }
    contoggleDropdown(){
      this.showDropdown=!this.showDropdown;
    //  this.search=this.form.get('search').value;
    //  console.log("valueeeeeee",this.search);
        }
  
    loctoggleDropdown(){
      this.showDropdown1=!this.showDropdown1;

    }
    unitoggleDropdown(){
      this.showDropdown2=!this.showDropdown2;

    }
    getUniSearchValue(){
      return this.form.value.universitysearch;
      }
    getLocSearchValue(){
    return this.form.value.locationsearch;
    }
    getSearchValue(){
      return this.form.value.search;
      //console.log("valueeeeeeeeeeeSelecccccct",this.conname)
    }

    
    countryselectValu(details,value){
       console.log("selecteddddd",value)
      this._indexservice.probCon=value;

      this.form.patchValue({"search":value});
       this.showDropdown = false;
       this._indexservice.countrySelected = details;
       console.log(this._indexservice.countrySelected.id);
       for (var item of this.countryName) {
        if (item.id == this._indexservice.countrySelected.id) {
          this.locationList = item.records;
          console.log("ItemLocdata", item.records);
        }
      }
      
      }  
      locationselectValu(detailsLoc, value){
        this._indexservice.probLoc= value;
        this.form.patchValue({"locationsearch": value});
       this.showDropdown = false;
       this._indexservice.locSelected = detailsLoc;
       console.log(this._indexservice.locSelected.id); 

       for (var itemU of this.locationList) {
        if (itemU.id == this._indexservice.locSelected.id) {
          this.universityName = itemU.uni;
          console.log("ItemUnidata", itemU.uni);
        }
      }
      }
      universityselectValu(detailsuni,value){
        this.form.patchValue({'universitysearch': value});
       this.showDropdown = false;
       this._indexservice.universitySelected = detailsuni.uni_id;
       console.log(this._indexservice.universitySelected);
       this._router.navigate(['/comparepage/'+this.urluni+ '/'+this.urlloc+ '/' +this.urlcon])

        if(this.urluni!='0'){
          if(this.urluni.indexOf((this._indexservice.universitySelected).toString())<0){
            this.urluni=  this.urluni+'-'+this._indexservice.universitySelected
            this.urlloc= this.urlloc+'-'+this._indexservice.locSelected.id
            this.urlcon= this.urlcon+'-'+this._indexservice.countrySelected.id
            this.getUniversityCompare(this.urluni,this.urlloc,this.urlcon);

            this._router.navigate(['/comparepage/'+this.urluni+ '/'+this.urlloc+ '/' +this.urlcon])

          }else{
           this.msg="already added.....try to add new one"
          }
      
        }else{
          this.urluni=(this._indexservice.universitySelected).toString()
          this.urlloc=this._indexservice.locSelected.id
          this.urlcon=this._indexservice.countrySelected.id
          this.getUniversityCompare(this.urluni,this.urlloc,this.urlcon);

          this._router.navigate(['/comparepage/'+this.urluni+ '/'+this.urlloc+ '/' +this.urlcon])
        }


      }
} 

