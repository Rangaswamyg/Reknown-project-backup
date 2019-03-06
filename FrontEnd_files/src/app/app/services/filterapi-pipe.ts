import { Pipe, PipeTransform, Testability } from '@angular/core';
import { IndexService } from '../services/index.service';
var filtered_count =0;

@Pipe({name: 'FilterApi'})
export class FilterApiPipe implements PipeTransform {
    constructor(public _indexservice: IndexService){}
    transform(allItems: any[],program_levels:String[],filterdata_count?:any): any[]{
       
       
    if(!program_levels || program_levels.length === 0) {
        console.log("pipeprogramlevel",program_levels)
        console.log(allItems);
        return allItems;
    }
    else{
         console.log("Filteringgg......");
    var out= allItems.filter(filterApis=> program_levels.includes(filterApis.records.courseDetails[0].level) )
    filterdata_count.count = out.length;
    this._indexservice.programleveluniversities = out;
    console.log(out);
    return out;
    }
    
    //console.log("end filteringggggg.....")
    }
}


@Pipe({name: 'selectbox'})
export class FilterApiPipeDropdown implements PipeTransform {
    constructor(public _indexservice: IndexService){}
    transform(allItems: any,selectedcountry?:any,filterdata_count?:any): any{
       //return selectedcountry ? allItemss.filter(dropapi=> dropapi.name === selectedcountry) : allItemss;
       if(!selectedcountry || selectedcountry === 'Change Country'){
        return allItems;
       }else{
        console.log('sel', selectedcountry);
        var country_data = selectedcountry ? allItems.filter(dropapi =>{ return dropapi.records.country_name[0].name == selectedcountry}) : allItems;
        filterdata_count.count = country_data.length;
        this._indexservice.countrydata_after_filtering = country_data;
        return country_data;  
    }
    }
}


@Pipe({name: 'FilterCourses'})
export class FilterCoursesPipe implements PipeTransform {
    constructor(public _indexservice: IndexService){}
    transform(allItems: any,programsearchfilter?:any,filterdata_count?:any): any{
    if(!programsearchfilter || programsearchfilter.length <= 0) {
      //  console.log("pipeprogramlevel",programlist)
      //  console.log(allItemss);
      console.log("checkinggggg courses.....");
        return allItems;
    }
    else{
        console.log('sel_course', programsearchfilter);
        var outputcourse= programsearchfilter ? allItems.filter(dropcourseapi =>{ return dropcourseapi.records.courseDetails[0].name.toLowerCase() == programsearchfilter.toLowerCase()}) : allItems;
        console.log('afterfiltercourses',outputcourse);
        filterdata_count.count = outputcourse.length;
        this._indexservice.coursedata_after_filtering =outputcourse;
        return outputcourse;
    }
    
    //console.log("end filteringggggg.....")
    }
}

@Pipe({name: 'Filterprogramsearch'})
export class FilterProgramSearchPipe implements PipeTransform {
    constructor(public _indexservice: IndexService){}
    transform(allItems: any,programsearch_home?:any): any{
       
       
    if(!programsearch_home || programsearch_home == undefined || programsearch_home == 0) {
      //  console.log("pipeprogramlevel",programlist)
      //  console.log(allItemss);
      console.log("checkinggggg program from home.....")
        return allItems;
    }
    else{
        console.log('sel_programhome', programsearch_home);
        var outputprogram = programsearch_home ? allItems.filter(dropprogramapi =>{ return dropprogramapi.records.courseDetails[0].id == programsearch_home._id.id}) : allItems;
         //console.log('afterfilterprogram',outputprogram)
         this._indexservice.programdata = outputprogram;
         return outputprogram;
   }
    
    //console.log("end filteringggggg.....")
    }
}

@Pipe({name: 'Filteruniversitysearch'})
export class FilterUniversitySearchPipe implements PipeTransform {
    constructor(private _indexservice: IndexService){}
    transform(allItems: any,universitysearch_home?:any): any{
       
       
    if(!universitysearch_home || universitysearch_home == undefined || universitysearch_home == 0) {
      //  console.log("pipeprogramlevel",programlist)
      //  console.log(allItemss);
      //console.log("checkinggggg university from home.....")
        return allItems;
    }
    else{
        console.log('sel_universityhome', universitysearch_home);
        //console.log('allitemsfrom uni',allItems);
        var outputuni = universitysearch_home ? allItems.filter(dropprogramapi =>{ return dropprogramapi.records.university_details[0].id == universitysearch_home._id.id}) : allItems;
        // console.log('afterfilteruniversity',outputuni)
        this._indexservice.universitydata = outputuni;
         return outputuni;
   }
    
    //console.log("end filteringggggg.....")
    }
}

@Pipe({name: 'Filtercountrysearch'})
export class FilterCountrySearchPipe implements PipeTransform {
    constructor(private _indexservice: IndexService){}
    transform(allItems: any,countrypageid?:any): any{
       
       
    if(!countrypageid || countrypageid == undefined || countrypageid == 0 ) {
      //  console.log("pipeprogramlevel",programlist)
      //  console.log(allItemss);
     // console.log("checkinggggg university from home.....")
        return allItems;
    }
    else{
        console.log('sel_countryhome', countrypageid);
        //console.log('allitemsfrom uni',allItems);
        var outputcountry = countrypageid ? allItems.filter(dropprogramapi =>{ return dropprogramapi.records.country_name[0].id == countrypageid._id.id}) : allItems;
        // console.log('afterfiltercountry',outputcountry.length);
         this._indexservice.countrydata = outputcountry;
         return outputcountry;
   }
    
    //console.log("end filteringggggg.....")
    }
}

@Pipe({name: 'universitypageselectbox'})
export class UniversitypagePipeDropdown implements PipeTransform {
    transform(universitycourseinfo: any,selectedprogramlevel?:any): any{
       //return selectedcountry ? allItemss.filter(dropapi=> dropapi.name === selectedcountry) : allItemss;
       if(!selectedprogramlevel || selectedprogramlevel === undefined){
        return universitycourseinfo;
       }else{
        console.log('selunipage', selectedprogramlevel);
        return selectedprogramlevel ? universitycourseinfo.filter(dropuniapi =>{ return dropuniapi.courseDetails[0].level == selectedprogramlevel}) : universitycourseinfo;
       }
    }
}

@Pipe({name: 'coursesfilterselectbox'})
export class UniversitypagecoursePipeSearch implements PipeTransform {
    transform(universitycourseinfo: any,selectedcourses?:any): any{
       //return selectedcountry ? allItemss.filter(dropapi=> dropapi.name === selectedcountry) : allItemss;
       if(!selectedcourses || selectedcourses === undefined){
        return universitycourseinfo;
       }else{
        console.log('selunipagecourse', selectedcourses);
        return selectedcourses ? universitycourseinfo.filter(dropunicapi =>{ return dropunicapi.courseDetails[0].name == selectedcourses}) : universitycourseinfo;
       }
    }
}


// exam score
@Pipe({name: 'examscore'})
export class ExamScorePipe implements PipeTransform {
    constructor(private _indexservice: IndexService){}
    transform(allItems: any,exam_score:any,examscore_data:String[],filterdata_count?:any): any{
     if(!examscore_data || examscore_data.length == 0 || examscore_data == undefined || exam_score == undefined){
        return allItems;
     }else{
      console.log('exam scoreeeee in pipe',examscore_data );
            var examscores_data= examscore_data ? allItems.filter(examapi =>{ return examapi.records[exam_score] >= examscore_data[0] && examapi.records[exam_score] <= examscore_data[1]}) : allItems;
            filterdata_count.count = examscores_data.length;
            this._indexservice.exam_scoredata_after_filtering =examscores_data;
            return examscores_data;

    //   if(exam_score == 'IELTS'){
    //   return examscore_data ? allItemss.filter(examapi =>{ return examapi.ielts >= examscore_data[0] && examapi.ielts <= examscore_data[1]}) : allItemss;
    //   }else if(exam_score == 'TOFEL'){
    //     return examscore_data ? allItemss.filter(examapi =>{ return examapi.tofel >= examscore_data[0] && examapi.tofel <= examscore_data[1]}) : allItemss;
    //   }else if(exam_score == 'PTE'){
    //     return examscore_data ? allItemss.filter(examapi =>{ return examapi.pte >= examscore_data[0] && examapi.pte <= examscore_data[1]}) : allItemss;
    //   }else{
    //     return allItemss;
    //   } 
    }
    }
}
