import {  PipeTransform, Pipe } from '@angular/core';
import { IUser, IRegisterProfile, IFilter, Pagination, PaginatedResult, LeadsCountResult, IProfileResults } from '../shared/interfaces';

@Pipe({
    name: 'profileFilter'
})
// export class ProductFilterPipe implements PipeTransform {

//     transform(value: IProduct[], filterBy: string): IProduct[] {
//         filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
//         return filterBy ? value.filter((product: IProduct) => 
//         (
//          (product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1) ||
//            (product.productCode.toLocaleLowerCase().indexOf(filterBy) !== -1)
//         )
//         : value;
//     }
// }


export class ProfileFilterPipe implements PipeTransform {
    //transform(value: IProfileResults[], filter: string): IProfileResults[] {
    //    filter = filter ? filter : '';
    //    return filter && value ?
    //        value.filter(profile =>
    //            (profile.AllocatedTo.indexOf(filter) !== -1) ||
    //            (profile.Name.indexOf(filter) !== -1)
    //        ) :
    //        value;
    //}

    transform(items: IProfileResults[], nameSearch: string, allocatedToSearch: string, statusSearch: string) {
        if (items && items.length) {
            return items.filter(item => {
                if (nameSearch && item.Name.toLowerCase().indexOf(nameSearch.toLowerCase()) === -1) {
                    return false;
                }   
                if (allocatedToSearch && item.AllocatedTo !=null && item.AllocatedTo.toLowerCase().indexOf(allocatedToSearch.toLowerCase()) === -1) {
                    return false;
                }
                if (statusSearch &&  item.DispositionStatus != null   && item.DispositionStatus.toLowerCase().indexOf(statusSearch.toLowerCase()) === -1) {
                    return false;
                }
                return true;
            })
        }
        else {
            return items;
        }
    }

}



