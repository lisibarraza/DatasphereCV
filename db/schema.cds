
@cds.persistence.exists 
Entity V_SCARR {
        key CARRID: String(3) not null  @title: 'CARRID' ; 
        MANDT: String(3) default '000' not null  @title: 'MANDT' ; 
        CARRNAME: String(20) not null  @title: 'CARRNAME' ; 
        CURRCODE: String(5) not null  @title: 'CURRCODE' ; 
        URL: String(255) not null  @title: 'URL' ; 
}

@cds.persistence.exists 
Entity V_SAIRPORT {
        key ID: String(3) not null  @title: 'ID' ; 
        MANDT: String(3) default '000' not null  @title: 'MANDT' ; 
        NAME: String(25) not null  @title: 'NAME' ; 
        TIME_ZONE: String(6) not null  @title: 'TIME_ZONE' ; 
}

@cds.persistence.exists 
Entity V_SAPLANE {
        key PLANETYPE: String(10) not null  @title: 'PLANETYPE' ; 
        MANDT: String(3) default '000' not null  @title: 'MANDT' ; 
        SEATSMAX: Integer default '0' not null  @title: 'SEATSMAX' ; 
        CONSUM: Double default '0' not null  @title: 'CONSUM' ; 
        CON_UNIT: String(3) not null  @title: 'CON_UNIT' ; 
        TANKCAP: Decimal(16, 4) default '0' not null  @title: 'TANKCAP' ; 
        CAP_UNIT: String(3) not null  @title: 'CAP_UNIT' ; 
        WEIGHT: Decimal(14, 4) default '0' not null  @title: 'WEIGHT' ; 
        WEI_UNIT: String(3) not null  @title: 'WEI_UNIT' ; 
        SPAN: Double default '0' not null  @title: 'SPAN' ; 
        SPAN_UNIT: String(3) not null  @title: 'SPAN_UNIT' ; 
        LENG: Double default '0' not null  @title: 'LENG' ; 
        LENG_UNIT: String(3) not null  @title: 'LENG_UNIT' ; 
        OP_SPEED: Decimal(17, 4) default '0' not null  @title: 'OP_SPEED' ; 
        SPEED_UNIT: String(3) not null  @title: 'SPEED_UNIT' ; 
        PRODUCER: String(5) not null  @title: 'PRODUCER' ; 
        SEATSMAX_B: Integer default '0' not null  @title: 'SEATSMAX_B' ; 
        SEATSMAX_F: Integer default '0' not null  @title: 'SEATSMAX_F' ; 
}

@cds.persistence.exists 
Entity V_SBOOK {
        Key BOOKID: String(8) default '00000000' not null  @title: 'BOOKID' ; 
        Key CUSTOMID: String(8) default '00000000' not null  @title: 'CUSTOMID' ; 
        CARRID: String(3) not null  @title: 'CARRID' ; 
        MANDT: String(3) default '000' not null  @title: 'MANDT' ; 
        CONNID: String(4) default '0000' not null  @title: 'CONNID' ; 
        FLDATE: String(8) default '00000000' not null  @title: 'FLDATE' ; 
        CUSTTYPE: String(1) not null  @title: 'CUSTTYPE' ; 
        SMOKER: String(1) not null  @title: 'SMOKER' ; 
        LUGGWEIGHT: Decimal(8, 4) default '0' not null  @title: 'LUGGWEIGHT' ; 
        WUNIT: String(3) not null  @title: 'WUNIT' ; 
        INVOICE: String(1) not null  @title: 'INVOICE' ; 
        CLASS: String(1) not null  @title: 'CLASS' ; 
        FORCURAM: Decimal(15, 2) default '0' not null  @title: 'FORCURAM' ; 
        FORCURKEY: String(5) not null  @title: 'FORCURKEY' ; 
        LOCCURAM: Decimal(15, 2) default '0' not null  @title: 'LOCCURAM' ; 
        LOCCURKEY: String(5) not null  @title: 'LOCCURKEY' ; 
        ORDER_DATE: String(8) default '00000000' not null  @title: 'ORDER_DATE' ; 
        COUNTER: String(8) default '00000000' not null  @title: 'COUNTER' ; 
        key AGENCYNUM: String(8) default '00000000' not null  @title: 'AGENCYNUM' ; 
        CANCELLED: String(1) not null  @title: 'CANCELLED' ; 
        RESERVED: String(1) not null  @title: 'RESERVED' ; 
        PASSNAME: String(25) not null  @title: 'PASSNAME' ; 
        PASSFORM: String(15) not null  @title: 'PASSFORM' ; 
        PASSBIRTH: String(8) default '00000000' not null  @title: 'PASSBIRTH' ; 
}

@cds.persistence.exists 
Entity V_SBUSPART {
        key BUSPARTNUM: String(8) default '00000000' not null  @title: 'BUSPARTNUM' ; 
        MANDT: String(3) default '000' not null  @title: 'MANDT' ; 
        CONTACT: String(25) not null  @title: 'CONTACT' ; 
        CONTPHONO: String(30) not null  @title: 'CONTPHONO' ; 
        BUSPATYP: String(2) not null  @title: 'BUSPATYP' ; 
}


@cds.persistence.exists 
Entity V_SCARPLAN {
        key CARRID: String(3) not null  @title: 'CARRID' ; 
        MANDT: String(3) default '000' not null  @title: 'MANDT' ; 
        PLANETYPE: String(10) not null  @title: 'PLANETYPE' ; 
        SNUMBER: Decimal(6) default '0' not null  @title: 'SNUMBER' ; 
}

@cds.persistence.exists 
Entity V_SCITAIRP {
        key CITY: String(20) not null  @title: 'CITY' ; 
        key COUNTRY: String(3) not null  @title: 'COUNTRY' ; 
        key AIRPORT: String(3) not null  @title: 'AIRPORT' ; 
        MASTERCITY: String(20) not null  @title: 'MASTERCITY' ; 
        MANDANT: String(3) default '000' not null  @title: 'MANDT' ; 
}

@cds.persistence.exists 
Entity V_SCOUNTER {
        key CARRID: String(3) not null  @title: 'CARRID' ; 
        key COUNTNUM: String(8) default '00000000' not null  @title: 'COUNTNUM' ; 
        key AIRPORT: String(3) not null  @title: 'AIRPORT' ; 
}

@cds.persistence.exists 
Entity V_SCPLANE {
        PLANETYPE: String(10) not null  @title: 'PLANETYPE' ; 
        CARGOMAX: Decimal(16, 4) default '0' not null  @title: 'CARGOMAX' ; 
        CAR_UNIT: String(3) not null  @title: 'CAR_UNIT' ; 
}

@cds.persistence.exists 
Entity V_SCURR {
        KURST: String(4) not null  @title: 'KURST' ; 
        FCURR: String(5) not null  @title: 'FCURR' ; 
        TCURR: String(5) not null  @title: 'TCURR' ; 
        GDATU: String(8) not null  @title: 'GDATU' ; 
        UKURS: Decimal(9, 5) default '0' not null  @title: 'UKURS' ; 
        FFACT: Decimal(9) default '0' not null  @title: 'FFACT' ; 
        TFACT: Decimal(9) default '0' not null  @title: 'TFACT' ; 
}

@cds.persistence.exists 
Entity V_SCURX {
        CURRKEY: String(5) not null  @title: 'CURRKEY' ; 
        CURRDEC: Int16 default '0' not null  @title: 'CURRDEC' ; 
}

@cds.persistence.exists 
Entity V_SCUSTOM {
        key ID: String(8) default '00000000' not null  @title: 'ID' ; 
        NAME: String(25) not null  @title: 'NAME' ; 
        FORM: String(15) not null  @title: 'FORM' ; 
        STREET: String(30) not null  @title: 'STREET' ; 
        POSTBOX: String(10) not null  @title: 'POSTBOX' ; 
        POSTCODE: String(10) not null  @title: 'POSTCODE' ; 
        CITY: String(25) not null  @title: 'CITY' ; 
        COUNTRY: String(3) not null  @title: 'COUNTRY' ; 
        REGION: String(3) not null  @title: 'REGION' ; 
        TELEPHONE: String(30) not null  @title: 'TELEPHONE' ; 
        CUSTTYPE: String(1) not null  @title: 'CUSTTYPE' ; 
        DISCOUNT: String(3) default '000' not null  @title: 'DISCOUNT' ; 
        LANGU: String(1) not null  @title: 'LANGU' ; 
        EMAIL: String(40) not null  @title: 'EMAIL' ; 
        WEBUSER: String(25) not null  @title: 'WEBUSER' ; 
}

@cds.persistence.exists 
Entity V_SFLIGHT {
        CARRID: String(3) not null  @title: 'CARRID' ; 
        CONNID: String(4) default '0000' not null  @title: 'CONNID' ; 
        FLDATE: String(8) default '00000000' not null  @title: 'FLDATE' ; 
        PRICE: Decimal(15, 2) default '0' not null  @title: 'PRICE' ; 
        CURRENCY: String(5) not null  @title: 'CURRENCY' ; 
        PLANETYPE: String(10) not null  @title: 'PLANETYPE' ; 
        SEATSMAX: Integer default '0' not null  @title: 'SEATSMAX' ; 
        SEATSOCC: Integer default '0' not null  @title: 'SEATSOCC' ; 
        PAYMENTSUM: Decimal(17, 2) default '0' not null  @title: 'PAYMENTSUM' ; 
        SEATSMAX_B: Integer default '0' not null  @title: 'SEATSMAX_B' ; 
        SEATSOCC_B: Integer default '0' not null  @title: 'SEATSOCC_B' ; 
        SEATSMAX_F: Integer default '0' not null  @title: 'SEATSMAX_F' ; 
        SEATSOCC_F: Integer default '0' not null  @title: 'SEATSOCC_F' ; 
}


@cds.persistence.exists 
Entity V_SGEOCITY {
        key CITY: String(20) not null  @title: 'CITY' ; 
        key COUNTRY: String(3) not null  @title: 'COUNTRY' ; 
        LATITUDE: Double default '0' not null  @title: 'LATITUDE' ; 
        LONGITUDE: Double default '0' not null  @title: 'LONGITUDE' ; 
        MANDT: String(3) default '300' not null  @title: 'MANDT' ; 
}


@cds.persistence.exists 
Entity V_SMACOURSE {
        CARRID: String(3) not null  @title: 'CARRID' ; 
        MEALNUMBER: String(8) default '00000000' not null  @title: 'MEALNUMBER' ; 
}

@cds.persistence.exists 
Entity V_SMEAL {
        CARRID: String(3) not null  @title: 'CARRID' ; 
        MEALNUMBER: String(8) default '00000000' not null  @title: 'MEALNUMBER' ; 
        MEALTYPE: String(2) not null  @title: 'MEALTYPE' ; 
}

@cds.persistence.exists 
Entity V_SMEALT {
        CARRID: String(3) not null  @title: 'CARRID' ; 
        MEALNUMBER: String(8) default '00000000' not null  @title: 'MEALNUMBER' ; 
        SPRACHE: String(1) not null  @title: 'SPRACHE' ; 
        TEXT: String(40) not null  @title: 'TEXT' ; 
}

@cds.persistence.exists 
Entity V_SMENU {
        CARRID: String(3) not null  @title: 'CARRID' ; 
        MENUNUMBER: String(4) default '0000' not null  @title: 'MENUNUMBER' ; 
        STARTER: String(8) default '00000000' not null  @title: 'STARTER' ; 
        MAINCOURSE: String(8) default '00000000' not null  @title: 'MAINCOURSE' ; 
        DESSERT: String(8) default '00000000' not null  @title: 'DESSERT' ; 
}

@cds.persistence.exists 
Entity V_SNVOICE {
        CARRID: String(3) not null  @title: 'CARRID' ; 
        CONNID: String(4) default '0000' not null  @title: 'CONNID' ; 
        FLDATE: String(8) default '00000000' not null  @title: 'FLDATE' ; 
        BOOKID: String(8) default '00000000' not null  @title: 'BOOKID' ; 
        CUSTOMID: String(8) default '00000000' not null  @title: 'CUSTOMID' ; 
        INSTNO: String(4) default '0000' not null  @title: 'INSTNO' ; 
        PAYMETH: String(1) not null  @title: 'PAYMETH' ; 
        AMOUNT: Decimal(15, 2) default '0' not null  @title: 'AMOUNT' ; 
        CURRENCY: String(5) not null  @title: 'CURRENCY' ; 
        ARCHIVE_: String(4) default '0000' not null  @title: 'ARCHIVE_' ; 
}

@cds.persistence.exists 
Entity V_SPFLI {
        CARRID: String(3) not null  @title: 'CARRID' ; 
        CONNID: String(4) default '0000' not null  @title: 'CONNID' ; 
        COUNTRYFR: String(3) not null  @title: 'COUNTRYFR' ; 
        CITYFROM: String(20) not null  @title: 'CITYFROM' ; 
        AIRPFROM: String(3) not null  @title: 'AIRPFROM' ; 
        COUNTRYTO: String(3) not null  @title: 'COUNTRYTO' ; 
        CITYTO: String(20) not null  @title: 'CITYTO' ; 
        AIRPTO: String(3) not null  @title: 'AIRPTO' ; 
        FLTIME: Integer default '0' not null  @title: 'FLTIME' ; 
        DEPTIME: String(6) default '000000' not null  @title: 'DEPTIME' ; 
        ARRTIME: String(6) default '000000' not null  @title: 'ARRTIME' ; 
        DISTANCE: Decimal(9, 4) default '0' not null  @title: 'DISTANCE' ; 
        DISTID: String(3) not null  @title: 'DISTID' ; 
        FLTYPE: String(1) not null  @title: 'FLTYPE' ; 
        PERIOD: Int16 default '0' not null  @title: 'PERIOD' ; 
}

@cds.persistence.exists 
Entity V_SSTARTER {
        CARRID: String(3) not null  @title: 'CARRID' ; 
        MEALNUMBER: String(8) default '00000000' not null  @title: 'MEALNUMBER' ; 
        HOT: String(1) not null  @title: 'HOT' ; 
}

@cds.persistence.exists 
Entity V_STICKET {
        CARRID: String(3) not null  @title: 'CARRID' ; 
        CONNID: String(4) default '0000' not null  @title: 'CONNID' ; 
        FLDATE: String(8) default '00000000' not null  @title: 'FLDATE' ; 
        BOOKID: String(8) default '00000000' not null  @title: 'BOOKID' ; 
        CUSTOMID: String(8) default '00000000' not null  @title: 'CUSTOMID' ; 
        TICKET: String(1) not null  @title: 'TICKET' ; 
        PLACE: String(40) not null  @title: 'PLACE' ; 
        ARCHIVE_: String(4) default '0000' not null  @title: 'ARCHIVE_' ; 
}

@cds.persistence.exists 
Entity V_STRAVELAG {
        key AGENCYNUM: String(8) default '00000000' not null  @title: 'AGENCYNUM' ; 
        NAME: String(25) not null  @title: 'NAME' ; 
        STREET: String(30) not null  @title: 'STREET' ; 
        POSTBOX: String(10) not null  @title: 'POSTBOX' ; 
        POSTCODE: String(10) not null  @title: 'POSTCODE' ; 
        CITY: String(25) not null  @title: 'CITY' ; 
        COUNTRY: String(3) not null  @title: 'COUNTRY' ; 
        REGION: String(3) not null  @title: 'REGION' ; 
        TELEPHONE: String(30) not null  @title: 'TELEPHONE' ; 
        URL: String(255) not null  @title: 'URL' ; 
        LANGU: String(1) not null  @title: 'LANGU' ; 
        CURRENCY: String(5) not null  @title: 'CURRENCY' ; 
}

@cds.persistence.exists 
Entity V_COUNTRY {
        COUNTRY: String(2)  @title: 'COUNTRY' ; 
        COUNTRY_NAME: String(280)  @title: 'COUNTRY_NAME' ; 
}

@cds.persistence.exists
Entity V_AIRPORT_LOCATION as 
SELECT 
FROM V_SAIRPORT AS AP
INNER JOIN V_SCITAIRP AS CTA ON AP.ID = CTA.AIRPORT
INNER JOIN V_COUNTRY AS CT ON CTA.COUNTRY = CT.COUNTRY
LEFT JOIN V_SGEOCITY AS GC ON CTA.COUNTRY = GC.COUNTRY AND CTA.CITY = GC.CITY
{
        key AP.ID, 
        key CTA.CITY, 
        key CT.COUNTRY_NAME, 
        AP.TIME_ZONE, 
        GC.LATITUDE, 
        GC.LONGITUDE
};

@cds.persistence.table
Entity AGCY_SALES_YEAR
{
        key ID : String(8); 
        NAME : String(25);
        AMOUNT : Decimal(15,2);
        key CURRENCY : String(5);
        key YEAR_ORDER : String(4);
        key MONTH_ORDER : String(2);
}
@cds.persistence.table
Entity AGCY_SALES_MAP
{
        key ID : String(8);
	NAME : String(25);
	CITY : String(25);
	COUNTRY : String(3);
	key CURRENCY : String(5);
	key YEAR_ORDER : String(4);
	key MONTH_ORDER : String(4);
	CC_MONTH_LETTER : String(12);
	AMOUNT : Decimal(15,2);
	LATITUDE : Double;
	LONGITUDE : Double;
        GEOLOCATION : hana.ST_POINT(3857);  
}

type AGENCY_SALES
{
        CARRID : String(3);
        CONNID : String(4);
        BOOKID : String(8);
        CUSTOMID : String(8);
        AGENCYNUM : String(8);
        AGENCY_NAME : String(25);
        AGENCY_STREET : String(30);
        AGENCY_POSTCODE : String(10);
        AGENCY_CITY : String(25);
        AGENCY_COUNTRY : String(3);
        AGENCY_TELEPHONE : String(30);
        CUST_NAME : String(25);
        CUST_STREET : String(30);
        CUST_CITY : String(25);
        CUST_COUNTRY : String(3);
        CUST_POSTCODE : String(10);
        CUST_TELEPHONE : String(30);
        CUST_DISCOUNT : String(3);
        CUST_EMAIL : String(40);
        CARRIER_NAME : String(20);
        CITYFROM : String(20);
        COUNTRYFR : String(3);
        AIRPFROM : String(3);
        CITYTO : String(20);
        COUNTRYTO : String(3);
        AIRPTO : String(3);
        DEPTIME : String(6);
        ARRTIME : String(6);
        PAYMETH : String(1);
        AMOUNT : Decimal (15,2);
        CURRENCY : String(5);
};

type CUSTOMER_PURCHASE
{
        CARRID : String(3);
        CONNID : String(4);
        BOOKID : String(8);
        CUSTOMID : String(8);
        AGENCYNUM : String(8);
        AGENCY_NAME : String(25);
        AGENCY_STREET : String(30);
        AGENCY_POSTCODE : String(10);
        AGENCY_CITY : String(25);
        AGENCY_COUNTRY : String(3);
        AGENCY_TELEPHONE : String(30);
        CUST_NAME : String(25);
        CUST_STREET : String(30);
        CUST_CITY : String(25);
        CUST_COUNTRY : String(3);
        CUST_POSTCODE : String(10);
        CUST_TELEPHONE : String(30) ;
        CUST_DISCOUNT : String(3);
        CUST_EMAIL : String(40);
        CARRIER_NAME : String(20);
        CITYFROM : String(20);
        COUNTRYFR : String(3);
        AIRPFROM : String(3);
        CITYTO : String(20);
        COUNTRYTO : String(3);
        AIRPTO : String(3);
        DEPTIME : String(6);
        ARRTIME : String(6);
        PAYMETH : String(1);
        AMOUNT : Decimal(15,2);
        CURRENCY : String(5);
}

type AGENCY : V_STRAVELAG
{
        AGENCYNUM : String(8); 
        NAME : String(25); 
        STREET : String(30); 
        POSTBOX : String(10); 
        POSTCODE : String(10); 
        CITY : String(25); 
        COUNTRY : String(3); 
        REGION : String(3); 
        TELEPHONE : String(30); 
        URL : String(255); 
        LANGU : String(1); 
        CURRENCY : String(5);
};

type CUSTOMER : V_SCUSTOM
{
        ID : String(8); 
        NAME : String(25); 
        FORM : String(15); 
        STREET : String(30); 
        POSTBOX : String(10); 
        POSTCODE : String(10); 
        CITY : String(25); 
        COUNTRY : String(3); 
        REGION : String(3); 
        TELEPHONE : String(30); 
        CUSTTYPE : String(1); 
        DISCOUNT : String(3); 
        LANGU : String(1); 
        EMAIL : String(40);
}

type AGENCY_SALES_YEAR : AGCY_SALES_YEAR
{
        ID : String(8); 
        NAME : String(25);
        AMOUNT : Decimal(15,2);
        CURRENCY : String(5);
        YEAR_ORDER : String(4);
        MONTH_ORDER : String(2);
}

type DATES_BOOK
{
        DATE_FROM: Date;
        DATE_TO: Date
}

type CITYAIRPORT : V_SCITAIRP
{
        CITY: String(20); 
        COUNTRY: String(3); 
        AIRPORT: String(3); 
        MASTERCITY: String(20);
        MANDANT: String(3);
}