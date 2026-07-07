using {V_SAIRPORT, V_SAPLANE, V_AIRPORT_LOCATION, V_SGEOCITY, V_STRAVELAG, V_SCUSTOM, V_SCITAIRP, AGENCY_SALES, AGENCY, CUSTOMER, 
        CUSTOMER_PURCHASE, AGENCY_SALES_YEAR, AGCY_SALES_YEAR, DATES_BOOK, CITYAIRPORT} from '../db/schema';


service CatalogService{
    //Entity to get Airport and Airplanes Information IN and OUT
    entity Airport as projection on V_SAIRPORT;
    entity Airplane as projection on V_SAPLANE;
    entity City as projection on V_SCITAIRP;

    //Airport location for Map 
    @readonly entity AirportLocation  as projection on V_AIRPORT_LOCATION;
    entity GeoLocation as projection on V_SGEOCITY;

    ///Entities for the Function use
    @readonly entity Agency as projection on V_STRAVELAG;
    @readonly entity Customer as projection on V_SCUSTOM;

    ///Entity for Report Agency Sales
    @readonly entity AgcySalesYear as projection on AGCY_SALES_YEAR;

    //Function to get Agency Sales by ID and Date From and To
    function getAgencySales(AGENCY_NUM: String, Date_From: Date, Date_To: Date) 
    returns array of AGENCY_SALES;

    //Function to get the Agency information based on ID
    function getAgency(AGENCY_NUM: String)
    returns array of AGENCY;

    //Function to get Customer from ID
    function getCustomer(CUST_ID: String)
    returns array of CUSTOMER;

    //Function that gets Customer Purchases based on ID and Dates from  -- to
    function getCustomerPurchase(CUST_ID: String, Date_From: Date, Date_To: Date) 
    returns array of CUSTOMER_PURCHASE;

    ///Function that gets the Sales per Year
    function getAgencySalesYear() returns array of AGENCY_SALES_YEAR;

    ///Function that gets the min Date From and Max Date To from books
    function getDatesRptSales() returns DATES_BOOK;

    ///Function that returns the Airport Geolocation
    function getAirportGeoData() returns array of CITYAIRPORT;

    ///SPROCS
    //SProc to Fil the Agency Sales based on Date From, To Date To
    action fillAgencySales( V_DATE_FROM: String,  V_DATE_TO: String);
}
