import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'searchFilter'})
export class SearchFilterPipe implements PipeTransform {
    transform(value: any, search: string): any {
         if  (!search) {return value; }
         let solution = value.filter(v => {
            if ( !v ) {return;}
           return  v._id.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        })
        return solution;
    }
}
@Pipe({name: 'searchFilterProbUni'})
export class SearchFilterPipeProbUni implements PipeTransform {
    transform(value: any, search: string): any {
         if  (!search) {return value; }
         let solution = value.filter(v => {
            if ( !v ) {return;}
           return  v.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        })
        return solution;
    }
}
@Pipe({name: 'searchFilterSecondpageUni'})
export class SearchFilterPipeSecondpageUni implements PipeTransform {
    transform(value: any, search: string): any {
        if  (!search) {return value; }
        let solution = value.filter(v => {
            if ( !v ) {return;}
            return  v.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        })
        return solution;

    }
}
@Pipe({name: 'searchFilterProbLoc'})
export class SearchFilterPipeProbLoc implements PipeTransform {
    transform(value: any, search: string): any {
         if  (!search) {return value; }
         let solution = value.filter(v => {
            if ( !v ) {return;}
           return  v.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        })
        return solution;
    }
}
@Pipe({name: 'searchFilterProbCountry'})
export class SearchFilterPipeProbCountry implements PipeTransform {
    transform(value: any, search: string): any {
         if  (!search) {return value; }
         let solution = value.filter(v => {
            if ( !v ) {return;}
           return  v.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        })
        return solution;
    }
}


@Pipe({name: 'searchFilter1'})
export class SearchFilterPipeCountry implements PipeTransform {
    transform(value: any, search: string): any {
        
        if  (!search) {return value; }
        let solution = value.filter(v => {
            if ( !v ) {return;}
            return  v.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        })
        console.log("COUNTTRYYYYY",solution)
        return solution;
        
    }
}
@Pipe({name: 'searchFilterUni'})
export class SearchFilterPipeUni implements PipeTransform {
    transform(value: any, search: string): any {
        if  (!search) {return value; }
        let solution = value.filter(v => {
            if ( !v ) {return;}
            return  v.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        })
        return solution;
    
    }
}

@Pipe({name: 'Sec_searchFilterUni'})
export class Sec_SearchFilterPipeUni implements PipeTransform {
    transform(value: any, unisearch: string): any {
        console.log("Valuuuuuuuue",value,"Searchhhhhh",unisearch)
        if  (!unisearch) {return value; }
        let solution = value.filter(v => {
            if ( !v ) {return;}
            return  v.name2.toLowerCase().indexOf(unisearch.toLowerCase()) !== -1;
        })
        console.log("PIPEEEEEEEEEEE",solution)
        return solution;
    
    }
}


@Pipe({name: 'searchProgramFilter'})
export class SearchFilterProgramPipe implements PipeTransform {
    transform(value: any, search: string): any {
         if  (!search) {return value; }
         let solution = value.filter(v => {
            if ( !v ) {return;}
           return  v.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        })
        return solution;
    }
}
