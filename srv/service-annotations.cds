using { CatalogService } from './service';

//1. Aggregation and analytical annotations
annotate CatalogService.AgcySalesYear with @(
  Aggregation.ApplySupported: {
    Transformations: [
      'aggregate',
      'topcount',
      'bottomcount',
      'groupby',
      'filter',
      'expand',
      'search'      
    ],
    GroupableProperties: [        
        NAME,
        CURRENCY
    ],
    AggregatableProperties: [{
      $Type : 'Aggregation.AggregatablePropertyType',
      Property: AMOUNT
    }]
  },
  Analytics.AggregatedProperty #totalSales: {
    $Type : 'Analytics.AggregatedPropertyType',
    AggregatableProperty : AMOUNT,
    AggregationMethod : 'sum',
    Name : 'totalSales',
    ![@Common.Label]: 'Total Sales'
  },
  Aggregation.CustomAggregate #AMOUNT: 'Edm.Decimal'
){
  AMOUNT @Analytics.Measure @Aggregation.default: #SUM
};

//2. Main chart
annotate CatalogService.AgcySalesYear with @(
  UI.Chart: {
    $Type : 'UI.ChartDefinitionType',
    Title: 'Sales per Agency',
    ChartType : #Column,
    Dimensions: [    
      NAME,
      CURRENCY,
      YEAR_ORDER,
      MONTH_ORDER
    ],
    DimensionAttributes: [{
      $Type : 'UI.ChartDimensionAttributeType',
      Dimension: NAME,
      Role: #Category
    }],
    DynamicMeasures: [
      ![@Analytics.AggregatedProperty#totalSales]
    ],
    MeasureAttributes: [{
      $Type: 'UI.ChartMeasureAttributeType',
      DynamicMeasure: ![@Analytics.AggregatedProperty#totalSales],
      Role: #Axis1
    }]
  },
  UI.PresentationVariant: {
    $Type : 'UI.PresentationVariantType',
    Total: [
      AMOUNT
    ],
    Visualizations : [
        '@UI.Chart',
    ],
  }
);

//3. Visual Filters
//category1
// Year filter
annotate CatalogService.AgcySalesYear with @(
  UI.Chart #year: {
    $Type : 'UI.ChartDefinitionType',
    ChartType: #Bar,
    Dimensions: [ YEAR_ORDER ],
    DynamicMeasures: [ ![@Analytics.AggregatedProperty#totalSales] ]
  },
  UI.PresentationVariant #prevYear: {
    $Type : 'UI.PresentationVariantType',
    Visualizations : [ '@UI.Chart#year' ],
  }
);

// Month filter
annotate CatalogService.AgcySalesYear with @(
  UI.Chart #month: {
    $Type : 'UI.ChartDefinitionType',
    ChartType: #Bar,
    Dimensions: [ MONTH_ORDER ],
    DynamicMeasures: [ ![@Analytics.AggregatedProperty#totalSales] ]
  },
  UI.PresentationVariant #prevMonth: {
    $Type : 'UI.PresentationVariantType',
    Visualizations : [ '@UI.Chart#month' ],
  }
);

// Currency filter
annotate CatalogService.AgcySalesYear with @(
  UI.Chart #currency: {
    $Type : 'UI.ChartDefinitionType',
    ChartType: #Bar,
    Dimensions: [ CURRENCY ],
    DynamicMeasures: [ ![@Analytics.AggregatedProperty#totalSales] ]
  },
  UI.PresentationVariant #prevCurrency: {
    $Type : 'UI.PresentationVariantType',
    Visualizations : [ '@UI.Chart#currency' ],
  }
);

//4. Selection Fields and Line Item
annotate CatalogService.AgcySalesYear with@(
    UI: {
        SelectionFields  : [
            YEAR_ORDER,
            MONTH_ORDER,
            CURRENCY
        ],
        LineItem: [
            {  $Type : 'UI.DataField', Value : ID, },
            {  $Type : 'UI.DataField', Value : NAME, },
            {  $Type : 'UI.DataField', Value : YEAR_ORDER, },
            {  $Type : 'UI.DataField', Value : MONTH_ORDER, },
            {  $Type : 'UI.DataField', Value : AMOUNT, },
            {  $Type : 'UI.DataField', Value : CURRENCY, },
        ],
    }
);