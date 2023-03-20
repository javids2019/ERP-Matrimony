export interface IUser {
    Id: number;
    Name: string;
    EmailId: string;
    Emailid: string;
    Designation: string;
    Role: string;
    IsActive: string;
    Createdby: string;
    Createddate: string;
    Updatedby: string;
    Updateddate: string;
    Password: string;
    TargetAmount: number;
}


export interface IRegisterProfile {
    Id: number;
    Name: string;
    lookingfor: string;
    Mobile: string;
    Email: string;
    City: string;
    IsActive: string;
    AllocatedTo: string;
    AllocatedDateTime: Date;
    RegisterType: string;
    MatId: string;
    CreatedBy: string;
    CreatedDate: Date;
    UpdatedBy: string;
    UpdatedDate: Date;
}

export interface IFollowupProfile {
    Id: number;
    RegisterProfileId: number,
    Name: string;
    lookingfor: string;
    Mobile: string;
    Email: string;
    City: string;
    DispositionStatus: string;
    IsActive: string;
    AllocatedTo: string;
    AllocatedDateTime: Date;
    TodayFollowupDate: Date;
    TodayFollowupTime: string;
    NextFollowupDate: Date;
    NextFollowupTime: string;
    Remarkes: string;
    timeStart: Date;
    CreatedBy: string;
    CreatedDate: Date;
    UpdatedBy: string;
    UpdatedDate: Date;
    SalesType: string;
    CashType: string;
    PackageDuration: string;
    Amount: number;
    StartDate: Date;
    EndDate: Date;
}


export interface IProfileResults {
    Id: number;
    RegisterProfileId: number,
    Name: string;
    lookingfor: string;
    Mobile: string;
    Email: string;
    City: string;
    DispositionStatus: string;
    IsActive: string;
    AllocatedTo: string;
    AllocatedDateTime: Date;
    RegisterType: string;
    Matid: string;
    AllocatedToId: number;
    AllocatedTo1: string;
    AllocatedToEmailId: string;
    FollowedBy: string;
    TodayFollowupDate: Date;
    TodayFollowupTime: string;
    NextFollowupDate: Date;
    NextFollowupTime: string;
    Remarkes: string;
    timeStart: Date;
    SalesType: string;
    CashType: string;
    PackageDuration: string;
    Amount: number;
    StartDate: Date;
    EndDate: Date;

    CreatedBy: string;
    CreatedDate: Date;
    UpdatedBy: string;
    UpdatedDate: Date;
}

export interface ISchedule {
    id: number;
    title: string;
    description: string;
    timeStart: Date;
    timeEnd: Date;
    location: string;
    type: string;
    status: string;
    dateCreated: Date;
    dateUpdated: Date;
    creator: string;
    creatorId: number;
    attendees: number[];
}

export interface IScheduleDetails {
    id: number;
    title: string;
    description: string;
    timeStart: Date;
    timeEnd: Date;
    location: string;
    type: string;
    status: string;
    dateCreated: Date;
    dateUpdated: Date;
    creator: string;
    creatorId: number;
    attendees: IUser[];
    statuses: string[];
    types: string[];
}

export interface Pagination {
    CurrentPage: number;
    ItemsPerPage: number;
    TotalItems: number;
    TotalPages: number;
}

export interface LeadsCountResult {
    OpenLeadsCount: number;
    TodayFollowupCount: number;
    FollowupCount: number;
    PromiseToPayCount: number;
    WalkinCount: number;
    LeadClosedCount: number;
    TotalAllCount: number;
    CallReachableCount: number;
    CallNotReachableCount: number;
    TargetAmount: number;
    RemainingAmount: number;

    NotconnectedCount: number;
    NotInterestedCount: number;
    RNRCount: number;
    SwitchedOffCount: number;
    MarriageFixedCount: number;
}

export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;
    leadsCountResult: LeadsCountResult;
}

export interface Predicate<T> {
    (item: T): boolean
}


export class IFilter {
    page: number;
    pageSize: number;
    allocatedto: string;
    registerType: string;
    matrimonyid: string;
    allocatedtoId: number;
    status: string;
    Name: string;
    NextFollowup: Date;
    CreatedDate: Date;
    MatId: string;
    MobileNo: string;
    EmailId: string;
    City: string;
    lookingFor: string;

    CashType: string;
    Duration: string;
    StartDate: Date;
    EndDate: Date;
    Amount: number;
    SalesType: string;
    RoleName: string;
}


export class SelectItems {

    public SelectItems(value, text) {
        this.Text = text;
        this.Value = value;
    }
    public Text: string;
    public Value: string;
    public bolean: string;
} 