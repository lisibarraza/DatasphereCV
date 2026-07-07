sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"viewrepsalesagcy/test/integration/pages/AgcySalesYearList.gen",
	"viewrepsalesagcy/test/integration/pages/AgcySalesYearObjectPage.gen"
], function (JourneyRunner, AgcySalesYearListGenerated, AgcySalesYearObjectPageGenerated) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('viewrepsalesagcy') + '/test/flp.html#app-preview',
        pages: {
			onTheAgcySalesYearListGenerated: AgcySalesYearListGenerated,
			onTheAgcySalesYearObjectPageGenerated: AgcySalesYearObjectPageGenerated
        },
        async: true
    });

    return runner;
});

