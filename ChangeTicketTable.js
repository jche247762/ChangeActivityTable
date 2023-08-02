var $ = lib.c.$;

 

function addActivityChange()

{

      var record = new SCFile("cm3r");

      var qry = record.doSelect("orig.date.entered>=tod()-'17 00:00:00' and open=true");

      while ( qry == RC_SUCCESS )

      {

            var fAct = new SCFile("activitycm3r");

            fAct.number = record.number;

            fAct.datestamp = system.functions.tod();

            fAct.operator = system.functions.operator();

            fAct.type = "Update";

            //when working with array fields in JavaScript, I always prefer to use

            //a temporary JavaScript array and then move all contents to the field...

            var arrDesc = new Array();

            arrDesc[0] = "Change Placed on Hold due to Emergency Embargo and Requester Interrupt";

            fAct.description = arrDesc;

            fAct.cust_visible = false;

            //negdatestamp is a negative date between 31/12/2199 17:00:00 and today datetime.

            //Please note that negdatestamp field is responsible for sorting activities!

            //Read note(*) at the end of the article to understand why I selected these values

            fAct.negdatestamp=system.functions.parse_evaluate("'31/12/2199 17:00:00' - tod()", 1);

            var rcAct = fAct.doInsert();

            qry = record.getNext();

      }

}

 

function updateActivityIncTasks()

{

      var record = new SCFile ("activityincidenttasks");

      var qry = record.doSelect("true");

      while (qry == RC_SUCCESS)

      {

            var fTask = new SCFile ("imTask");

            var qry = fTask.doSelect("id=\""+record.number+"\"");

            if (qry == RC_SUCCESS)

            {

                  record.opt_parentIncident=fTask.parent_incident;

                  var rcTask = record.doUpdate();

                  print(record.opt_parentIncident);

            }

      qry = record.getNext();

      }

}

//updateActivityIncTasks()

 

function updateActivityCm3t()

{

      var record = new SCFile("activitycm3t");

      var qry = record.doSelect('true');

      while (qry == RC_SUCCESS)

      {

            var fTask = new SCFile ("cm3t");

            var qry = fTask.doSelect("number=\""+record.number+"\"");

            if (qry == RC_SUCCESS)

            {

                  record.opt_parentChange=fTask.parent_change;

                  var rcTask = record.doUpdate();

                  print(record.opt_parentChange);

            }

      qry = record.getNext();

      }

}

//updateActivityCm3t()

           

/**

* This function is to populate the Helix virtual table , this function is called from display screen : change.view

* @param   {String}   fRecord

*/

function createHelixViewTable(name, order, status, category) {

                 

      //setIfOffshoreUser();

      //abbreviation for system.functions

      var _sf = system.functions;

      var sCR = "\n";

      //vars.$recCount = getTopCount();

      vars.$opteofmessage = "";

     

      var coloumns = new Array();

      coloumns = ["Name","Order id","Status","RFS Date","Order Category"];

     

      var sHtmlReturn = lib.timeperiodCSS.getCSS();

      sHtmlReturn += "<table class=\"TableResults\" width=\"100%\">" + sCR;

 

      sHtmlReturn += createColoumnHeader(coloumns);

     

      var rowdata = new Array();

     

      rowdata.push(name);

      rowdata.push(order);

      rowdata.push(status);

      rowdata.push("test");

      rowdata.push(category);

 

      //var optCustEofs = new SCFile("optcustomereofs",SCFILE_READONLY);

      //var rc = optCustEofs.doSelect("opt.changeId=\"" + fRecord.number + "\"");

     

      //var sql = 'SELECT TOP ' + vars.$recCount + ' * FROM optcustomereofs cust WHERE cust.opt.changeId="' + fRecord.number + '"';

      //var rc = optCustEofs.doSelect(sql);

      //vars.$optchmeofcount = returnEOFCount(fRecord);

     

      //if(vars.$optchmeofcount > vars.$recCount)

            //vars.$opteofmessage = "For smooth performance only the first " + vars.$recCount + " records are displayed. Please use 'Export to CSV' button to export all EOF records for this Change."

     

      //while(rc == RC_SUCCESS)

      //{

            /*var rowdata = new Array();

            if(vars["$G.offshoreUser"]){

                  //print("Offshore user");

                  var secureCustomer = IsCustomerSecure(optCustEofs["opt.customerName"]);

                  if(secureCustomer){

                        // mask data if the customer is secure and operator is Offshore

                        rowdata = ["X-XX-X","X-XX-X","X-XX-X","X-XX-X","X-XX-X","X-XX-X","X-XX-X","X-XX-X","X-XX-X","X-XX-X","X-XX-X","X-XX-X","X-XX-X"];

                  }

                  else{

                        rowdata.push(optCustEofs["opt.trailName"]);

                        rowdata.push(system.functions.nullsub(optCustEofs["opt.customerName"]," "));

                        rowdata.push(optCustEofs["opt.signalId"]);

                        rowdata.push(optCustEofs["opt.trailType"]);

                        rowdata.push(optCustEofs["opt.aEndAddress"]);

                        rowdata.push(optCustEofs["opt.zEndAddress"]);

                        rowdata.push(optCustEofs["opt.nc"]);

                        rowdata.push(optCustEofs["opt.trailDataType"]);

                        rowdata.push(optCustEofs["opt.status"]);

                        rowdata.push(optCustEofs["opt.startDate"]);

                        rowdata.push(optCustEofs["opt.EndDate"]);

                        rowdata.push(optCustEofs["opt.orderItem"]);

                        rowdata.push(optCustEofs["opt.level"]);

                  }

                 

            }else{

                  //print("not Offshore user");

                  rowdata.push(optCustEofs["opt.trailName"]);

                  rowdata.push(system.functions.nullsub(optCustEofs["opt.customerName"]," "));

                  rowdata.push(optCustEofs["opt.signalId"]);

                  rowdata.push(optCustEofs["opt.trailType"]);

                  rowdata.push(optCustEofs["opt.aEndAddress"]);

                  rowdata.push(optCustEofs["opt.zEndAddress"]);

                  rowdata.push(optCustEofs["opt.nc"]);

                  rowdata.push(optCustEofs["opt.trailDataType"]);

                  rowdata.push(optCustEofs["opt.status"]);

                  rowdata.push(optCustEofs["opt.startDate"]);

                  rowdata.push(optCustEofs["opt.EndDate"]);

                  rowdata.push(optCustEofs["opt.orderItem"]);

                  rowdata.push(optCustEofs["opt.level"]);

            }

           

            sHtmlReturn += createRowData(rowdata);

            rc = optCustEofs.getNext();

      }

      */

      sHtmlReturn += createRowData(rowdata);

      sHtmlReturn += "</table>" + sCR;     

 

    return sHtmlReturn;

      

}          

           

/**

* Create the coloumn header for the virtual table.

* @param   {String}   coloumnNames

*/

function createColoumnHeader(coloumnNames){

      var sHtmlHeader = "<tr><th style=\"text-align:left;\" class=\"TableHeading\"><div style=\"border-bottom: solid 1px #888;\"><div tabindex=\"0\" class=\"table-hd-inner\"><span class=\"TableHeadingText\">" ;

 

      for(var i=0;i<coloumnNames.length-1;i++){

            sHtmlHeader +=coloumnNames[i] + "</span></div></div></th><th style=\"text-align:left;\" class=\"TableHeading\"><div style=\"border-left: solid 1px #888;border-bottom: solid 1px #888;\"><div tabindex=\"0\" class=\"table-hd-inner\"><span class=\"TableHeadingText\">";

      }

      sHtmlHeader += coloumnNames[i] + "</span></div></div></th></tr>";

      return sHtmlHeader;

}

 

/**

* Create the row data for the virtual table.

* @param   {String}   rowData

*/

function createRowData(rowData){

     

      var sRowClass = "TableCellResults";

      var sHtmlRowdata = "<tr class=\"TableNormalRow\">";

                       

      for(var i=0;i<rowData.length;i++){

            sHtmlRowdata += "<td class=\""+sRowClass+"\" ><div tabindex=\"0\" class=\"shadowFocus\"><div class=\"Text FormatTableElementReadonly\"><span class=\"file_Approval field_approval_status xTableCell FormatTableElementReadonly value_pending\"> <font size=\"2\"> " + rowData[i] + "</span></div></div></td>";

      }

      sHtmlRowdata += "</tr>" + "\n";

      return sHtmlRowdata;

}          

 

function createHelixViewTableEmpty() {

                 

      var _sf = system.functions;

      var sCR = "\n";

      vars.$opteofmessage = "";

     

      var coloumns = new Array();

      coloumns = ["Name","Order id","Status","RFS Date","Order Category"];

     

      var sHtmlReturn = lib.timeperiodCSS.getCSS();

      sHtmlReturn += "<table class=\"TableResults\" width=\"100%\">" + sCR;

 

      sHtmlReturn += createColoumnHeader(coloumns);

     

      sHtmlReturn += "</table>" + sCR;     

 

    return sHtmlReturn;

      

}          

 

function createHelixViewTableCircuitsEmpty() {

                 

      var _sf = system.functions;

      var sCR = "\n";

      vars.$opteofmessage = "";

     

      var coloumns = new Array();

      coloumns = ["Circuits"];

     

      var sHtmlReturn = lib.timeperiodCSS.getCSS();

      sHtmlReturn += "<table class=\"TableResults\" width=\"100%\">" + sCR;

 

      sHtmlReturn += createColoumnHeader(coloumns);

     

      sHtmlReturn += "</table>" + sCR;     

 

    return sHtmlReturn;

      

}

 

function createHelixViewCircuitsTable(circuit) {

                 

      var _sf = system.functions;

      var sCR = "\n";

     

      var coloumns = new Array();

      coloumns = ["Circuits"];

     

      var sHtmlReturn = lib.timeperiodCSS.getCSS();

      sHtmlReturn += "<table class=\"TableResults\" width=\"100%\">" + sCR;

 

      sHtmlReturn += createColoumnHeader(coloumns);

     

      var rowdata = new Array();

     

      rowdata.push(circuit);

 

 

      sHtmlReturn += createRowData(rowdata);

      sHtmlReturn += "</table>" + sCR;     

 

    return sHtmlReturn;

      

}

 

function gettest(number) {

            var siteName = "";

            var chm = new SCFile ("cm3r")

            var qry2 = chm.doSelect("number=\""+number+"\"");

           

            for (var i=0;i<chm.SiteDetails.length();i++){

            var location = new SCFile ("location")

            var qry = location.doSelect("location.code=\""+chm.SiteDetails[i].opt_siteCode+"\"");

            if (qry == RC_SUCCESS){

            var address = lib.ArrayUtil.toJsArray(location.address)

            //print(chm.SiteDetails[i].opt_siteCode)

            siteName = siteName + address + "," + location.city + "," + location.state + "," + location.zip + ";"

            //siteName = siteName + chm.SiteDetails[i].opt_siteCode + ";"

            //print(siteName);

            }

      }

      siteName = siteName

      //siteName = siteName + chm.SiteDetails[i].opt_siteCode;

      print(siteName);

}

//gettest("C10062")

 

 

 

function mygroups(operator) {

var groups = new Array()

var mygroups = new SCFile("myGroups")

var qry = mygroups.doSelect("name=\""+operator+"\"");

if (qry == RC_SUCCESS){

for (var i=0;i<mygroups.member_of.length();i++){

groups.push(mygroups.member_of[i])

print(groups);

      }

}

}

//mygroups("CP699063")

 

function getTaskCountInc(){

var incident = new SCFile("probsummary");

var sql = incident.doSelect("problem.status~=\"Closed\"");

      while (sql == RC_SUCCESS)

      {

            var count = 0

            var tasks = new SCFile("imTask")

            //var qry = tasks.doSelect("parent.incident=\""+incident.number+"\" and status~=\"Closed\"");

            var qry = tasks.doSelect("parent.incident=\""+incident.number+"\" and not current.phase isin {\"Closure\",\"Cancelled\"}");

 

            while (qry == RC_SUCCESS)

            {

                  count++    

                  qry = tasks.getNext()  

            }

            qry = tasks.getNext()

            incident.opt_taskCount=count;

            incident.doUpdate();

            print("Incident: " +incident.number+ " Count: "+count);

            sql = incident.getNext()

      }

}

//getTaskCountInc()

 

function getTaskCountChm(number){

var chm = new SCFile("cm3r");

var sql = chm.doSelect("current.phase~=\"Closure\" and current.phase~=\"Abandoned\"");

//var sql = chm.doSelect("number=\""+number+"\"");

      while (sql == RC_SUCCESS)

      {

            var count = 0

            var tasks = new SCFile("cm3t")

            var qry = tasks.doSelect("parent.change=\""+chm.number+"\" and current.phase~=\"Closed\" and current.phase~=\"Cancelled\"");

            while (qry == RC_SUCCESS)

            {

                  count++    

                  qry = tasks.getNext()

            }

            qry = tasks.getNext()

            chm.opt_taskCount=count;

            chm.doUpdate();

            print("Change: " +chm.number+ " Count: "+count);

            sql = chm.getNext()

      }

}

//getTaskCountChm()

 

function setDeviceLocation(){

var count = 0

var ci = new SCFile("device");

//var sql = ci.doSelect("logical.name=\""+name+"\" and istatus=\"In Use\" and type isin {\"networkcomponents\",\"optsite\"} and location.code~=NULL")

var sql = ci.doSelect("istatus=\"In Use\" and type isin {\"networkcomponents\",\"optsite\"} and location.code~=NULL")

      while (sql == RC_SUCCESS)

      {

            count++

            print(count);

            var location = new SCFile("location")

            var qry = location.doSelect("location.code=\""+ci.location_code+"\"");

            if (qry == RC_SUCCESS)

            {

                  if(ci.location != location.location)

                  {

                        print("CI - "+ci.sm_device_display_name+ " - Changed Location from: "+ci.location+ " To: "+location.location);

                        ci.location=location.location;

                        ci.doUpdate();

                  }

            }

      sql = ci.getNext()

      }

}

//setDeviceLocation()

 

 

function setIncidentLocation(){

var count = 0

var inc = new SCFile("probsummary");

//var sql = inc.doSelect("number=\""+number+"\" and problem.status~=\"Closed\"")

var sql = inc.doSelect("problem.status~=\"Closed\" and logical.name~=\"CI1663757\"")

      while (sql == RC_SUCCESS)

      {

            count++

            print(count);

            var device = new SCFile("device")

            var qry = device.doSelect("logical.name=\""+inc.logical_name+"\"");

            if (qry == RC_SUCCESS)

            {

                  var location = new SCfile("location")

                  var query = location.doSelect("location=\""+device.location+"\"");

                  if (query == RC_SUCCESS)

                  {

                        if(inc.location_full_name != location.location_structure)

                        {

                              print("Inc - "+inc.number+ " - Changed Location from: "+inc.location_full_name+ " To: "+location.location_structure);

                              inc.location_full_name=location.location_structure;

                              inc.doUpdate();

                        }

                  }

            }

      sql = inc.getNext()

      }

}

//setIncidentLocation()

 

 

function cleanIncidentLocation(){

var count = 0

var inc = new SCFile("probsummary");

var sql = inc.doSelect("location.full.name=\"Generic CI/null\"")

      while (sql == RC_SUCCESS)

      {

            count++

            print(count);

            print("Inc - "+inc.number+ " - Changed Location From: "+inc.location_full_name+ " To = NULL");

            inc.location_full_name=null;

            inc.doUpdate();

            sql = inc.getNext()

      }

}

//cleanIncidentLocation()

 

function setGroupDefaultActivities(operator, assignment, module){

 

      var mygroups = new SCFile("myGroups");

      var qry = mygroups.doSelect("name=\""+operator+"\"");

      if (qry == RC_SUCCESS)

      {

            for (var i=0;i<mygroups.member_of.length();i++){

                  if (assignment != null && assignment == mygroups.member_of[i])

                  {

                        print(mygroups.member_of[i]);

                        return mygroups.member_of[i]

                  }

            }

      }

     

      var ope = new SCFile("operator");

      var query = ope.doSelect("name=\""+operator+"\"");

      if (query == RC_SUCCESS && ope.opt_defaultIncidentGroup!=null && module=="IM")

            {

                  print(ope.opt_defaultIncidentGroup);

                  return ope.opt_defaultIncidentGroup;

            }

           

      if (query == RC_SUCCESS && ope.opt_defaultChangeGroup!=null && module=="CM")

            {

                  print(ope.opt_defaultChangeGroup);

                  return ope.opt_defaultChangeGroup;

            }

           

      if (query == RC_SUCCESS && ope.opt_defaultProblemGroup!=null && module=="PM")

            {

                  print(ope.opt_defaultProblemGroup);

                  return ope.opt_defaultProblemGroup;

            }

           

      print(mygroups.member_of[0]);

      return mygroups.member_of[0];

 

}

           

 

function checkOperatorGroup(group, operator, module){

      //print(group)

      var ope = new SCFile("operator");

      var query = ope.doSelect("name=\""+operator+"\"");

            if (query == RC_SUCCESS && ope.opt_defaultIncidentGroup!=group && module=="IM")

            {

                  //print("IM Group Changed");

                  return true;

            }

                 

            if (query == RC_SUCCESS && ope.opt_defaultChangeGroup!=group && module=="CM")

            {

                  //print("CM Group Changed");

                  return true;

            }

                       

            if (query == RC_SUCCESS && ope.opt_defaultProblemGroup!=group && module=="PM")

            {

                  //print("PM Group Changed");

                  return true;

            }

                 

            //print("Group Not Changed");

            return false;    

}

 

function setDefaultOperatorGroup(group, operator, module){

      var ope = new SCFile("operator");

      var query = ope.doSelect("name=\""+operator+"\"");

            if (query == RC_SUCCESS && module=="IM")

            {

                  ope.opt_defaultIncidentGroup=group;

                  ope.doUpdate();

            }

           

            if (query == RC_SUCCESS && module=="CM")

            {

                  ope.opt_defaultChangeGroup=group;

                  ope.doUpdate();

            }

           

            if (query == RC_SUCCESS && module=="PM")

            {

                  ope.opt_defaultProblemGroup=group;

                  ope.doUpdate();

            }

}

     

 

//Calculate Risk Rating based on Likelihood score and Potential Impact score

   //It is called by related Rule Sets

  

//var $ = lib.c.$;

 

function setRating(likelihood, impact, affectedCI) {

      if (affectedCI != null)

      {

            for (var i=0;i<affectedCI.length();i++){

           

            var ci = new SCFile("device");

            var query = ci.doSelect("logical.name=\""+affectedCI[i]+"\" and opt.highrisk.platform=true");

            if (query == RC_SUCCESS)

            {

                  return 14;

            }

      }

      }

      var impactValue = parseInt(impact, 0);

//print (impactValue);

      var likelihoodValue = parseInt(likelihood, 0);

//print (likelihoodValue);

 

      var rating = Math.floor(impactValue * likelihoodValue);

//print (rating);

 

      return rating.toString();

  }

 

 

function setOverallRisk() {

      var count=0;

      var chm = new SCFile("cm3r");

      var sql = chm.doSelect("current.phase~=\"Closure\" and current.phase~=\"Abandoned\" and current.phase~=\"Registration and Categorization\" and current.phase~=\"Validation\" and current.phase~=\"Risk and Impact Analysis\" and category=\"Normal Change\"");

      while (sql == RC_SUCCESS)

      {

            count++;

            print(count);

           

            chm.opt_risk_likelihood="1";

            chm.opt_potential_impact="0";

            chm.opt_risk_rating=0;

            chm.doUpdate();

            sql = chm.getNext()

      }

}

//setOverallRisk()           

 

function checkDuplicatesTrailNames(changeID, trailName){

 

      var findeofrecord= new SCFile("optcustomereofs");

      var rc = findeofrecord.doSelect("opt.changeId=\"" + changeID + "\" and opt.trailName=\"" + trailName + "\"");

      if(rc == RC_SUCCESS){

            print("true");

            return true;

           

      }

      print("false")

      return false;

}

 

function concatenateActivities(incident){

     

      var inc = new SCFile("probsummary");

      var sql = inc.doSelect("number=\"" + incident + "\"")

      var activities = new SCFile("activity");

      var qry = activities.doSelect("number=\"" + incident + "\"");

      while (qry == RC_SUCCESS)

      {

            var date = new Date();

            date = lib.upgradeCommonLib.formatDate(activities.datestamp, "dd/mm/yyyy HH:MM:ss")

            var type = "Type: " +activities.type+ "\n"

            var date = "Date: " +date+ "\n";

            var operator = "Operator: " +activities.operator+ "\n";

            var description = "\nDescription: ";

        var tab = "\n#########################################################################################################################################################################";             

                                

        var JournalActivity=type+date+operator+description;

           

            inc.opt_activity_log.push(JournalActivity)

            inc.opt_activity_log.push(activities.description)

            inc.opt_activity_log.push(tab)

           

            qry = activities.getNext();

      }

      inc.doUpdate();

}

//concatenateActivities("IM12456")

 

function updateActivities(incident){

     

      var inc = new SCFile("probsummary");

      var sql = inc.doSelect("number=\"" + incident + "\"")

      inc.activity_log = [];

      var activities = new SCFile("activity");

      var qry = activities.doSelect("number=\"" + incident + "\"");

      while (qry == RC_SUCCESS)

      {

            var newdate = new Date();

            newdate = lib.upgradeCommonLib.formatDate(activities.datestamp, "dd/mm/yyyy HH:MM:ss")

            var type = "Type: " +activities.type+ "\n"

            var date = "Date: " +newdate+ "\n";

            var operator = "Operator: " +activities.operator+ "\n";

            var description = "\nDescription: ";

        var tab = "\n#########################################################################################################################################################################";             

                                          

        var JournalActivity=type+date+operator+description;

           

            inc.opt_activity_log.push(JournalActivity)

            inc.opt_activity_log.push(activities.description)

            inc.opt_activity_log.push(tab)

           

            qry = activities.getNext()

      }

}

     

function getMOPAttachment(number){

      var activity = new SCFile("activitycm3r");

      //var sql = activity.doSelect("number=\"" + number + "\" and type=\"Attachment Added\"")

      //var query = activity.doSelect("number=\"" + number + "\" and type=\"Attachment Deleted\"")

      var queryAdd = "number=\"" + number + "\" and type=\"Attachment Added\" and description#\"MOP Attachment\"";

      var queryDel = "number=\"" + number + "\" and type=\"Attachment Deleted\" and description#\"MOP Attachment\"";

      var rcAdd = activity.doCount(queryAdd);

      var rcDel = activity.doCount(queryDel);

     

      //print(rcAdd)

      //print(rcDel)

     

      if (rcAdd > rcDel)

      {

            return true

           

      }

      return false

}

 

function countMopAttachments(number){

      var attach = new SCFile("SYSATTACHMENTS");

      var query = "segment=0 and topic =\"" + number + "\" and filename like \"*MOP*\"";

      var count = attach.doCount(query);

            return count;

      }

 

function uppercase(value) {

      var name = value.toUpperCase()

      //print(name.substring(0,3))

      if(name.indexOf("MOP") > -1)

     

      //if(name.substring(0,3) == "MOP")

      {

            //print("true")

            return true

      }

      //print("false")

      return false

}

 

 

function getAttachmentHTML(number) {

 

     var _sf                 = system.functions;

     var sCR                 = "\n";

   // var iLineCount          = 0;

    var sHtmlReturn     = getSDAttachmentCSS();

    sHtmlReturn         += "<table class=\"TableResults\" style=\"width:100%;\" summary=\""+ _sf.scmsg(6, "mop")  +"\">" + sCR;   //MOP Attachments

                                        

    // Table header         

    sHtmlReturn += "<tr>"+

                              "<th class=\"TableHeading\" style=\"text-align:left;\"><div style=\"border-bottom: solid 1px #888;\"><div tabindex=\"0\" class=\"table-hd-inner\"><span class=\"TableHeadingText\">" +     _sf.scmsg(1, "mop") + "</span></div></div></th>" +              // Attachment Name

                              "<th class=\"TableHeading\" style=\"text-align:left;\"><div style=\"border-bottom: solid 1px #888;border-left: solid 1px #888;\"><div tabindex=\"0\" class=\"table-hd-inner\"><span class=\"TableHeadingText\">" +     _sf.scmsg(2, "mop") + "</span></div></div></th>" +                // Size

                              "<th class=\"TableHeading\" style=\"text-align:left;\"><div style=\"border-bottom: solid 1px #888;border-left: solid 1px #888;\"><div tabindex=\"0\" class=\"table-hd-inner\"><span class=\"TableHeadingText\">" +    _sf.scmsg(3, "mop") + "</span></div></div></th>" //+         // Change ID

                              //"<th class=\"TableHeading\" style=\"text-align:left;\"><div style=\"border-bottom: solid 1px #888;border-left: solid 1px #888;\"><div tabindex=\"0\" class=\"table-hd-inner\"><span class=\"TableHeadingText\">" +    _sf.scmsg(4, "mop") + "</span></div></div></th>";                  // MOP

    sHtmlReturn += "</th></tr>"; // closing tag for header

     

      //$("screlation", SCFILE_READONLY).setOrderBy(['depend'], [SCFILE_ASC]).select("depend.filename=\"incidents\" and source=\"" + number + "\"").iterate(function(record) {

            //var interaction_id = record.depend;

            var query = "application=\"cm3r\" and topic=\"" + number + "\" and segment=0 and filename like \"*MOP*\"";

           

            $("SYSATTACHMENTS", SCFILE_READONLY).select(query).iterate(function(attachment) {

            // build HTML

                  var sRowClass = "TableCellResults";   //iLineCount%2==0 ? "evenRow" : "oddRow";

                  var file_size = Math.round(attachment.size/1024);

                  if (file_size == 0) {

                        file_size = 1;

                  }

                  var file_mop = attachment.mimetype;

                 

          //      iLineCount++;     // counter for even / odd row

            sHtmlReturn += "<tr class=\"TableNormalRow\">";                  

            sHtmlReturn += "<td class=\""+sRowClass+"\"><div><a class=\"shadowFocus\" tabindex=\"0\" href=\"scattach://"+attachment.uid+":" + attachment.filename + ":Changes:" + number + "\"><div class=\"Text FormatTableElementReadonly\"><span class=\"xTableCell FormatTableElementReadonly\" style=\"text-decoration:underline;color:#0000FF;\">" + attachment.filename + "</span></div></a></div></td>";

            sHtmlReturn += "<td class=\""+sRowClass+"\"><div tabindex=\"0\" class=\"shadowFocus\"><div class=\"Text FormatTableElementReadonly\"><span class=\"file_Approval field_approval_status xTableCell FormatTableElementReadonly value_pending\">" + file_size + "</span></div></div></td>";

            sHtmlReturn += "<td class=\""+sRowClass+"\"><div tabindex=\"0\" class=\"shadowFocus\"><div class=\"Text FormatTableElementReadonly\"><span class=\"file_Approval field_approval_status xTableCell FormatTableElementReadonly value_pending\">" + number + "</span></div></div></td>";

            //sHtmlReturn += "<td class=\""+sRowClass+"\"><div tabindex=\"0\" class=\"shadowFocus\"><div class=\"Text FormatTableElementReadonly\"><span class=\"file_Approval field_approval_status xTableCell FormatTableElementReadonly value_pending\">" + file_mop + "</span></div></div></td>";        

            sHtmlReturn += "</tr>" + sCR;

            });

      //});

 

    sHtmlReturn += "</table>" + sCR;

    return sHtmlReturn;

}

 

 

/**

*  Get the related interaction records of the fulfilled record, and return the total attachment number of them

*    

*  @param {fulfilled_record_id} string - id of the fulfilled record

*  @returns {number} - the total attachment number of related interaction records

*/

function countAttachments(number) {

      var attach_number = 0;

 

      $("screlation", SCFILE_READONLY).select("depend.filename=\"incidents\" and source=\"" + number + "\"").iterate(function(record) {

            var interaction_id = record.depend;

            var query = "application=\"incidents\" and topic=\"" + interaction_id + "\" and segment=0";

           

            attach_number += $("SYSATTACHMENTS", SCFILE_READONLY).count(query);

      });

      return attach_number;

}

 

/**

*  This functions build and return the CSS Style for the interaction attachment HTML tables in the fulfilled record

*    

*  @returns {string} style - the CSS style

*/

function getSDAttachmentCSS()

{

 

      var style;

      style =           "<style> ";

      style +=    "body{border:0 0 0 0;margin:0;padding:0;font-family: Verdana, Arial, Helvetica, sans-serif;}";

      style +=    ".main{width:100%;font-size: 12;text-align: left}";

      style +=    ".main th{font-weight: bold;font-size: 14;padding:4;background: #E0E0E0;}";

      style +=    ".main td{padding:8}";

      style +=    ".oddRow{background: #edf3fe;color: black}";

      style +=    ".evenRow{background: white;color: black}";

      style +=    "</style>";

 

      return style;

 

}

 

function getKMarticlesNotifications()

{

      var record = new SCFile("kmdocument");

      var qry = record.doSelect("sysmodtime<=tod()-'90 00:00:00' and status isin {\"conclude\",\"external\",\"internal\",\"review\",\"revise\",\"triage\"}");

      while ( qry == RC_SUCCESS )

      {

            //print(record.id+ "-" +record.sysmodtime);

            var notification = "KM 90 days without update";

            callrad("us.notify", ["name", "record"], [notification, record]);

            qry = record.getNext();

      }

 

      var record = new SCFile("kmdocument");

      var qry = record.doSelect("expiration.date<=tod()+'30 00:00:00' and expiration.date>=tod() and documentOwner<>NULL and status isin {\"conclude\",\"external\",\"internal\",\"review\",\"revise\",\"triage\"} and (opt.expired30days=NULL or opt.expired30days=false)");

      while ( qry == RC_SUCCESS )

      {

            //print(record.id+ "-" +record.expiration_date);

            var notification = "KM expired in 30 days";

            callrad("us.notify", ["name", "record"], [notification, record]);

            record.opt_expired30days=true;

            record.doUpdate();

            qry = record.getNext();

      }

     

      var record = new SCFile("kmdocument");

      var qry = record.doSelect("expiration.date<=tod() and documentOwner<>NULL and status isin {\"conclude\",\"external\",\"internal\",\"review\",\"revise\",\"triage\"} and (opt.expired=NULL or opt.expired=false)");

      while ( qry == RC_SUCCESS )

      {

            //print(record.id+ " - " +record.expiration_date+ " - " +record.status);

            var notification = "KM expiration date";

            callrad("us.notify", ["name", "record"], [notification, record]);

            record.opt_expired=true;

            record.doUpdate();

            qry = record.getNext();

      }

}

//getKMarticlesNotifications()

 

 

function getAssignmentGroup(operator) {

      var ope = new SCFile("operator");

      var qry = ope.doSelect("name=\""+operator+"\"");

      if (qry == RC_SUCCESS )

      {

            //print(ope.opt_defaultIncidentGroup);

            return ope.opt_defaultIncidentGroup;

           

      }

}

           

           

function getOperator(extid) {

      var inc = new SCFile("probsummary");           

      var qry = inc.doSelect("opt.externalId=\""+extid+"\"");

      if (qry == RC_SUCCESS )

      {

            //print(inc.sysmoduser)

            return inc.sysmoduser;

           

      }

}    

                 

function setSiteDetailsIntegrated(record, oldrecord) {

     

      for(var i = 0;i<record.SiteDetails.length();i++){

 

            if ( record.SiteDetails[i].opt_siteName == null || record.SiteDetails[i].opt_siteName == "")

            {

                  record.SiteDetails[i].opt_siteName = oldrecord.SiteDetails[i].opt_siteName;

            }

            if ( record.SiteDetails[i].opt_siteCode == null || record.SiteDetails[i].opt_siteCode == "")

            {

                  record.SiteDetails[i].opt_siteCode = oldrecord.SiteDetails[i].opt_siteCode;

            }

            if ( record.SiteDetails[i].opt_siteNumber == null || record.SiteDetails[i].opt_siteNumber == "")

            {

                  record.SiteDetails[i].opt_siteNumber = oldrecord.SiteDetails[i].opt_siteNumber;

            }

            if ( record.SiteDetails[i].opt_JVNumber == null || record.SiteDetails[i].opt_JVNumber == "")

            {

                  record.SiteDetails[i].opt_JVNumber = oldrecord.SiteDetails[i].opt_JVNumber;

            }

            if ( record.SiteDetails[i].opt_siteControllerName == null || record.SiteDetails[i].opt_siteControllerName == "")

            {

                  record.SiteDetails[i].opt_siteControllerName = oldrecord.SiteDetails[i].opt_siteControllerName;

            }

      }

 

}

           

     

function checkMajorAccess(){

      var arr = new Array();

      var opeGroups = lib.ArrayUtil.toJsArray(vars.$lo_pm_assignments);

     

      var ag = new SCFile("assignment");

      var qry = "opt.majoraccess=true ";

      rc = ag.doSelect(qry);

      while(rc==RC_SUCCESS)

      {

       

      arr.push(ag.name);

      rc=ag.getNext();

     

      }

      for(var i = 0;i<arr.length;i++){

     

            if(lib.ArrayUtil.contains(opeGroups, arr[i])==true)

            {

            //print(arr[i]);

            //print(lib.ArrayUtil.contains(opeGroups, arr[i]))

                  return true;

            }

      }

      return false

}

     

/**

* Create the coloumn header for the virtual table.

* @param   {String}   coloumnNames

*/

function createColoumnHeader(coloumnNames){

      var sHtmlHeader = "<tr><th style=\"text-align:left;\" class=\"TableHeading\"><div style=\"border-bottom: solid 1px #888;\"><div tabindex=\"0\" class=\"table-hd-inner\"><span class=\"TableHeadingText\">" ;

 

      for(var i=0;i<coloumnNames.length-1;i++){

            sHtmlHeader +=coloumnNames[i] + "</span></div></div></th><th style=\"text-align:left;\" class=\"TableHeading\"><div style=\"border-left: solid 1px #888;border-bottom: solid 1px #888;\"><div tabindex=\"0\" class=\"table-hd-inner\"><span class=\"TableHeadingText\">";

      }

      sHtmlHeader += coloumnNames[i] + "</span></div></div></th></tr>";

      return sHtmlHeader;

}

 

/**

* Create the row data for the virtual table.

* @param   {String}   rowData

*/

function createRowData(rowData){

     

      var sRowClass = "TableCellResults";

      var sHtmlRowdata = "<tr class=\"TableNormalRow\">";

                       

      for(var i=0;i<rowData.length;i++){

            sHtmlRowdata += "<td class=\""+sRowClass+"\" ><div tabindex=\"0\" class=\"shadowFocus\"><div class=\"Text FormatTableElementReadonly\"><span class=\"file_Approval field_approval_status xTableCell FormatTableElementReadonly value_pending\"> <font size=\"2\"> " + rowData[i] + "</span></div></div></td>";

      }

      sHtmlRowdata += "</tr>" + "\n";

      return sHtmlRowdata;

}

 

function domessageBox(message)

{

 

if(vars.$G_bg || vars.$L_bg || system.functions.nullsub(vars.$G_ess, false))

{

print(message);

return;

}

var rteReturnValue = new SCDatum();

var argNames = new SCDatum();

var argVals = new SCDatum();

argVals.setType(8); //type array

argNames.setType(8); //type array

 

var argVal=new SCDatum();

argVal.setType(2); //string

argVal="text";

argNames.push(argVal);

argVal1=new SCDatum();

argVal1.setType(2); //string

argVal1=message;

argVals.push(argVal1);

 

system.functions.rtecall("callrad",rteReturnValue,"mb.ok",argNames,argVals,true);

}    

 

 

/**

* This function is to populate the Helix virtual table , this function is called from display screen : db.view

* @param   {String}   fRecord

*/

function displayVendorTrackingParent(vendortracking) {

                 

      var _sf = system.functions;

      var sCR = "\n";

     

      var coloumns = new Array();

      coloumns = ["Vendor Name","Vendor Ref ID","First Booked Time","Vendor Service ID","Charge Type","SLA Type","First Response Time","Restored Time","Special Instruction"];

     

      var sHtmlReturn = lib.timeperiodCSS.getCSS();

      sHtmlReturn += "<table class=\"TableResults\" width=\"100%\">" + sCR;

 

      sHtmlReturn += createColoumnHeader(coloumns);

     

      var len = lib.ArrayUtil.length(vendortracking);

     

      for (var i = 0;i<len;i++){

     

      if (vendortracking[i].opt_vendor == "Telstra" || vendortracking[i].opt_vendor == "NBN Co"){

           

            var rowdata = new Array();

           

            var firstbookedtime = new XMLDate(vendortracking[i].opt_firstbookedtime).getSCDateTimeString()

            var firstresponsetime = new XMLDate(vendortracking[i].opt_firstresponsetime).getSCDateTimeString()

            var restoredtime = new XMLDate(vendortracking[i].opt_restoredtime).getSCDateTimeString()

           

            rowdata.push(vendortracking[i].opt_vendor);

            rowdata.push(vendortracking[i].opt_vendorrefid);

            rowdata.push(firstbookedtime);

            rowdata.push(vendortracking[i].opt_vendorserviceid); 

            rowdata.push(vendortracking[i].opt_chargetype);

            rowdata.push(vendortracking[i].opt_slatype);

            rowdata.push(firstresponsetime);

            rowdata.push(restoredtime);

            rowdata.push(vendortracking[i].opt_specialinstructions);

            sHtmlReturn += createRowData(rowdata);

            }

     

      }

      sHtmlReturn += "</table>" + sCR;     

 

    return sHtmlReturn;

      

}

 

 

function AutomateCancelChanges() {

      var chm = new SCFile("cm3r");

      var sql = chm.doSelect("category=\"Normal Change\" and current.phase isin {\"Registration and Categorization\",\"Validation\"} and requestedDate~=NULL and planned.start<=tod() and number=\"C13909\"");

      //var sql = chm.doSelect("category=\"Normal Change\" and current.phase isin {\"Registration and Categorization\",\"Validation\"} and requestedDate~=NULL and planned.start<=tod()");

      while (sql == RC_SUCCESS)

      {

            print(chm.number);

            chm.doAction("_wfE:cancel.auto");

            //chm.closing_comments[0]="Change is auto cancelled by NSM Tool as the change was not sent to OPE queue for processing on same day to meet the lead times. Please raise and schedule your changes only if the necessary checklist for successful implementation of your activity are in place.";

            //chm.completion_code=6;

            //chm.pir_review[0]="Auto Closed by NSM.";

            //chm.current_phase="Closure"

            //chm.close_time=system.functions.tod();

            //chm.doUpdate();

            sql = chm.getNext()

      }

}

//AutomateCancelChanges()

 

 

function sendNotification( changeID,filenew,optionEmail,Customer,retryflag)

{

      print("optionEmail: "+optionEmail);

      var rc;

      var findeofrecord= new SCFile("optcustomereofs");

      var messageText = SMS_text_message;

      var smsStatus;

      var smsFailed = false;

      var emailStatus;

      var emailFailed = false;

      //var uniqueCustomerNames = new Array;

      var uniqueTrailNames = new Array;

      var trailName = new Array;

      var blankCusotmerNames = false;

     

      //Delete and archive existing records in optcustomernotif to optcustomernotifhist for the current Change Request.Archiving  is done by the trigger on optcustomernotif table

      //Only the latest notification attempted is recorded in optcustomernotif

      if(retryflag=="retry"){

         var uniqueCustomerName=Customer;

      }else{

        //print("UCN: "+getUniqueCustNamesForCm3r(changeID));

        var uniqueCustomerName=Customer;

      deleteCustNotification(changeID, Customer);

    }

      //print(changeID+" eofnotif: uniqueCustomerNames: "+uniqueCustomerNames[0] ); 

     

 

      if(uniqueCustomerName!=null && uniqueCustomerName!=""){

            //for(var custcount=0;custcount<uniqueCustomerNames.length; custcount++)

            //{

                //print(changeID+"  eofnotif uniqueCustomerNames: "+uniqueCustomerNames[custcount]);  //

                  //if(uniqueCustomerNames[custcount] != "No Customer name found"){

                        var cust_eof_trail_name  = new Array;

                        var cust_eof_serviceType = new Array;

                        var cust_eof_AEndAddress = new Array;

                        var cust_eof_ZEndAddress = new Array;

                        var cust_eof_trail_name_aff  = new Array;

                        var cust_eof_serviceType_aff = new Array;

                        var cust_eof_AEndAddress_aff = new Array;

                        var cust_eof_ZEndAddress_aff = new Array;

                       

                        var cust_eof_trail_name_pro  = new Array;

                        var cust_eof_serviceType_pro = new Array;

                        var cust_eof_AEndAddress_pro = new Array;

                        var cust_eof_ZEndAddress_pro = new Array;

                       

                        //vars.$opt_customerName = uniqueCustomerNames[custcount];

                       

                        //var recordCount=findeofrecord.doCount("opt.changeId=\"" + changeID + "\" and opt.customerName=\""+uniqueCustomerNames[custcount]+"\"");

                        var f = findeofrecord.doSelect("opt.changeId=\"" + changeID + "\" and opt.customerName=\""+uniqueCustomerName+"\" and (opt.duplicate=false or opt.duplicate=NULL)");

                        while (f == RC_SUCCESS)

                              {

                                    if(optionEmail){

                                          //Set the Trail Name,ServieType and Address to variables to be used in the email notification:

                                          if(findeofrecord.opt_trailDataType == "Affected Trail" || findeofrecord.opt_trailDataType == "AffectedTrail")

                                          {

                                                cust_eof_trail_name_aff.push("\""+findeofrecord.opt_trailName+"\"");

                                                cust_eof_serviceType_aff.push("\""+findeofrecord.opt_trailType+"\"");

                                                cust_eof_AEndAddress_aff.push("\""+findeofrecord.opt_aEndAddress+"\"");

                                                cust_eof_ZEndAddress_aff.push("\""+findeofrecord.opt_zEndAddress+"\"");

                                          }

                                          if(findeofrecord.opt_trailDataType == "Protected Trail" || findeofrecord.opt_trailDataType == "ProtectedTrail")

                                          {

                                                cust_eof_trail_name_pro.push("\""+findeofrecord.opt_trailName+"\"");

                                                cust_eof_serviceType_pro.push("\""+findeofrecord.opt_trailType+"\"");

                                                cust_eof_AEndAddress_pro.push("\""+findeofrecord.opt_aEndAddress+"\"");

                                                cust_eof_ZEndAddress_pro.push("\""+findeofrecord.opt_zEndAddress+"\"");

                                          }

                                          if(findeofrecord.opt_trailDataType != "Protected Trail" && findeofrecord.opt_trailDataType != "ProtectedTrail" && findeofrecord.opt_trailDataType != "AffectedTrail" && findeofrecord.opt_trailDataType != "Affected Trail")

                                          {

                                                cust_eof_trail_name.push("\""+findeofrecord.opt_trailName+"\"");

                                                cust_eof_serviceType.push("\""+findeofrecord.opt_trailType+"\"");

                                                cust_eof_AEndAddress.push("\""+findeofrecord.opt_aEndAddress+"\"");

                                                cust_eof_ZEndAddress.push("\""+findeofrecord.opt_zEndAddress+"\"");

                                          }

                                 }

                                   

                                   

                                    f=findeofrecord.getNext();

                              }                

 

                              if(optionEmail){

                              vars.$opt_chm_cust_eof_trail_name = cust_eof_trail_name;

                              vars.$opt_chm_cust_eof_serviceType = cust_eof_serviceType;

                              vars.$opt_chm_cust_eof_AEndAddress = cust_eof_AEndAddress;

                              vars.$opt_chm_cust_eof_ZEndAddress = cust_eof_ZEndAddress;

                             

                              vars.$opt_chm_cust_eof_trail_name_affected = cust_eof_trail_name_aff;

                              vars.$opt_chm_cust_eof_serviceType_affected = cust_eof_serviceType_aff;

                              vars.$opt_chm_cust_eof_AEndAddress_affected = cust_eof_AEndAddress_aff;

                              vars.$opt_chm_cust_eof_ZEndAddress_affected = cust_eof_ZEndAddress_aff;

                             

                              vars.$opt_chm_cust_eof_trail_name_protected = cust_eof_trail_name_pro;

                              vars.$opt_chm_cust_eof_serviceType_protected = cust_eof_serviceType_pro;

                              vars.$opt_chm_cust_eof_AEndAddress_protected = cust_eof_AEndAddress_pro;

                              vars.$opt_chm_cust_eof_ZEndAddress_protected = cust_eof_ZEndAddress_pro;

                             

                              //print(vars.$opt_chm_cust_eof_trail_name);    

                              //print(changeID+" eofnotif opt_customerName:"+uniqueCustomerNames[custcount]);

                              emailStatus = sendCustomerEmail(changeID,uniqueCustomerName,findeofrecord.opt_trailName,filenew,null);

                             

                              //if(!emailStatus){

                                    //emailFailed = true;

                              //}

                        }

                        //if(!optionEmail){

                              //messageText = vars.$opt_chm_customer_note;

                              //smsStatus = sendCustomerSMS(changeID, findeofrecord.opt_customerName,findeofrecord.opt_trailName, messageText );

                             

                              //if(smsStatus==status_failed){

                                    //smsFailed = true;

                              //}

                        //}

                             

                        //vars.$opt_chm_cust_eof_trail_name = null;

                        //vars.$opt_chm_cust_eof_serviceType = null;

                        //vars.$opt_chm_cust_eof_AEndAddress = null;

                        //vars.$opt_chm_cust_eof_ZEndAddress = null;         

                                   

                  //}

                  //else{

                  //blankCusotmerNames = true; 

                  //emailFailed = true;

                  }

            //}

 

            //if(!optionEmail){

                  //if(smsFailed)  

                        //print("Some SMS messages were not sent successfully");

                  //else

                        //print("All SMS messages sent successfully");

                 

            //}

           

            if(optionEmail){

                  if(emailFailed && blankCusotmerNames)    

                        print("Some Email messages were not sent successfully - Blank Customer Names found in the EOF table!!!");

                  else if(emailFailed)

                        print("Some Email messages were not sent successfully");

                  else

                        print("All Email messages sent successfully");

                 

            }

           

      //}else{

            //print("No Data available for sending");

      //}  

     

}

 

function deleteCustNotification(changeID, Customer)

{

      var findnotifrecord= new SCFile("optcustomernotif");

      var recordCount=findnotifrecord.doCount("opt.changeId=\"" + changeID + "\" and opt.customerName=\"" +Customer+ "\"");

      var f = findnotifrecord.doSelect( "opt.changeId=\"" + changeID + "\" and opt.customerName=\"" +Customer+ "\"");

      if ( f == RC_SUCCESS )

            {

                  for(var i=0;i<recordCount;i++)

                  {  

                        findnotifrecord.doDelete();

                        findnotifrecord.getNext();

                  }

            }

}

 

 

function addDevices(record){

 

      for(var i=0;i<record.assets.length();i++)

      {

            var ci = new SCFile("device");

            var sql = ci.doSelect("logical.name=\""+record.assets[i]+"\"");

            if (sql == RC_SUCCESS)

            {                      

                  record.SiteDetails[i].opt_siteName=ci.display_name;

                  record.SiteDetails[i].opt_siteCode=ci.location_code;

                  record.SiteDetails[i].opt_JVNumber=ci.optJVNumber;

                  record.SiteDetails[i].opt_siteContact=ci.optSiteContact;

                  record.SiteDetails[i].opt_siteControllerName=ci.optControllerName;

                  record.SiteDetails[i].opt_siteNumber=ci.optSiteNumber;

                  record.SiteDetails[i].opt_siteClassification=ci.optPriority;

            }

                 

      }

}

 

function autoNotificationCoordinator(record){

//print(record.number);

//return true;

      var impacts = record.opt_selectableImpacts;

      var reference = record.opt_referenceNumbers;

     

      for(var i=0;i<impacts.length();i++)

      {

            //if(impacts[i].indexOf("Vodafone") > -1)

            if(impacts[i].startsWith("Vodafone"))

            {

                  for(var i=0;i<reference.length();i++)

                  {

                        //if(reference[i].indexOf("CRQ") > -1)

                        if(reference[i].startsWith("CRQ"))

                        {

                              print("true");

                              //return true;

                        }

                  }

            }

      }

      print("false");

      //return false;

}

 

function triageSpares(record){

 

      var sapId = record.opt_spares_sap;

      var qty = record.opt_spares_qty;

      qty = lib.ArrayUtil.removeEmptyDatumElement(qty);

      qty = lib.ArrayUtil.toJsArray(qty);

      //sapId = lib.ArrayUtil.removeEmptyDatumElement(sapId);

      sapId = lib.ArrayUtil.toJsArray(sapId);

      //sapId=lib.ArrayUtil.removeDuplicateEmptyElement(sapId);

      //print(qty);

     

      record.opt_spares_sap=[];

      record.opt_spares_desc=[];

      record.opt_spares_vendor=[];

      record.opt_spares_qty=[];

     

      for(var i = 0;i<sapId.length;i++){

     

            if(sapId[i]!=null)

            {

                  var spare = new SCFile('optSparesTask');

                  var qry = spare.doSelect("id=\""+sapId[i]+"\"");

                  if (qry == RC_SUCCESS )

                  {

                        //print(sapId[i]);

                        record.opt_spares_sap.push(sapId[i]);

                        //record.opt_spares_qty.push(qty[i]);

                        //description[i].push(util.description);

                        record.opt_spares_desc.push(spare.description)

                        record.opt_spares_vendor.push(spare.vendor)

                        //record.opt_spares_desc.push("test")

                  }else{

                        print("The Sap ID:"+sapId[i]+" not found.")

                  }

            }

      }

 

      for(var i = 0;i<qty.length;i++){

     

            if(qty[i]!=null)

            {

                        //print(qty[i]);

                        record.opt_spares_qty.push(qty[i]);

            }

      }

}

 

function setHighRiskChanges()

{

      var record = new SCFile("cm3r");

      var qry = record.doSelect("true");

      while ( qry == RC_SUCCESS )

      {

            if (record.assets != null)

            {

                  for (var i=0;i<record.assets.length();i++){

                  var ci = new SCFile("device");

                  var query = ci.doSelect("logical.name=\""+record.assets[i]+"\" and opt.highrisk.platform=true");

                  if (query == RC_SUCCESS)

                  {

                        print("Change ID : "+record.number);

                        record.emergency=true;

                        record.doUpdate();

                  }

            }

            }

      qry = record.getNext();

      }          

}

//setHighRiskChanges()

 

 

 

function insertSchedule(parent, thenumber, number)

{

      //var description = new Array();

    //description=lib.ArrayUtil.toJsArray(desc)

      var newSchedule = new SCFile("schedule");

      var today = new Date();

      //newSchedule.application="updateParentJournalUpdate";

      newSchedule._class="problem"

      newSchedule.name="updateParentJournalUpdateIncident";

      newSchedule.expiration=today;

newSchedule.javascript="lib.optIMTaskCEUtility.updateParentJournalUpdateIncidents(\""+parent+"\",\""+thenumber+"\",\""+number+"\");"

      var rc = newSchedule.doInsert();

}

 

function AssignApprovalandReviewerGroupsBasedOnRules(change)

{

      print("######################### Approval Groups ##################");

      //print("Populate Auto Approval, Outage Reviewer and Reviewer Groups based on Rules");

      var idx=change.opt_state.indexOf("(")+1;

      var len=change.opt_state.length-idx-1;

      var state=change.opt_state.substr(idx, len);

           

      //iterate all CIs to find unique list of optEquipType

      //print(change.assets.getText());

      var typeList=new Array();

      var ci=new SCFile("device");

      var sql="logical.name isin "+change.assets.getText()+" or display.name isin "+change.assets.getText();

      rc=ci.doSelect(sql);

      while (rc==RC_SUCCESS)

      {

            var equipType="null";

            if (ci.optEquipType!=null) equipType=ci.optEquipType;

            if (lib.ArrayUtil.indexOf(typeList, equipType)<0) typeList.push(equipType);

            rc=ci.getNext();

      }

      typeList=lib.ArrayUtil.removeDuplicateEmptyElement(typeList);

      //print("CI typeList: ",typeList);

     

      var keys = new Array();

      var len=vars.$G_opt_chm_init_impact_disp[change.initial_impact-1].length;

      var timeofChange="Normal";

      if (lib.ArrayUtil.indexOf(change.opt_otherSelectableItems,"After Hours")>=0) timeofChange="After Hours";

     

      for (var i=0;i<typeList.length;i++)

      {

            var key="ApprAssignRule-"+change.subcategory+"|"+typeList[i]+"|"+vars.$G_opt_chm_init_impact_disp[change.initial_impact-1].substring(4,len)+"|"+change.opt_workType+"|"+state+"|"+timeofChange;

            keys.push(key);

            //print("ApprAssignRule Key: "+key);

      }

      var keystr="{\""+keys.toString().replace(/,/g,"\",\"")+"\"}";

      //Find exact match Rules for Approval Groups

      var rule=new SCFile("ApprovalDef");

      var query="name isin "+keystr;

      var rc=rule.doSelect(query);

      //if (rc==RC_SUCCESS) print("Auto assignment rule found ("+rule.name+").");

      while (rc==RC_SUCCESS)

      {    

            //print(rule.name,"rule.group_name.length()="+rule.group_name.length());

          for (var k=0;k<rule.group_name.length();k++)

          {

                  switch (rule.short_desc[k])

                  {

                        case "Approval Group":

                        if (lib.ArrayUtil.indexOf(change.approved_groups,rule.group_name[k])<0)

                        change.approved_groups.push(rule.group_name[k]);

                        break;

                 case "Outage Reviewer Group":

                        if (lib.ArrayUtil.indexOf(change.op_outageReviewers,rule.group_name[k])<0)

                        change.op_outageReviewers.push(rule.group_name[k]);

                        break;

                 case "Reviewer Group":

                        if (lib.ArrayUtil.indexOf(change.reviewer_class,rule.group_name[k])<0)

                        change.reviewer_class.push(rule.group_name[k]);

                        break;

                  }    

          }

          rc=rule.getNext();

      }

     

      //Find all "Any" rules and match with the key/keys if there are multiple CI types

      var rule2=new SCFile("ApprovalDef");

      var query2="name like \"ApprAssignRule-"+change.subcategory+"|*\" and name like \"*|Any*\"";

      var rc2=rule2.doSelect(query2);

      //if (rc2==RC_SUCCESS) print("Auto Assignment \"Any\" Rule found ("+rule2.name+"). Matching the current change.");

      while (rc2==RC_SUCCESS)

      {

            matchApprDefKeyWithAny(change,state,keys,typeList,rule2);

          rc2=rule2.getNext();

      }

     

      //Find rules for Reviewer Group e.g. VHA related

      matchApprDefKeyforReviewers(change);

     

      //Remove Null and Duplicate groups 

change.approved_groups=lib.tableUtil.removeNullAndDuplicate(change,change.approved_groups);

      change.op_outageReviewers=lib.tableUtil.removeNullAndDuplicate(change, change.op_outageReviewers);

      change.reviewer_class=lib.tableUtil.removeNullAndDuplicate(change, change.reviewer_class);

      //change.doAction("save");

      print("AUTO APPROVERS - "+change.approved_groups);

      return change.approved_groups

}

 

function matchApprDefKeyWithAny(change,state,keys,typeList,apprDef)

{

      var cols=apprDef.name.split("|");//print("AnyAny Rule: "+cols);

     

      for (var j=0;j<typeList.length;j++)

      {

            var newKey=cols[0];

            for (var i=1;i<cols.length;i++)

            {

                  if (cols[i]!="Any" && cols[i]!="any")

                  {

                        newKey=newKey+"|"+cols[i];

                  }else

                  {;

                        if (i==1) newKey=newKey+"|"+typeList[j];

                        if (i==2)

                        {

                              var len=vars.$G_opt_chm_init_impact_disp[change.initial_impact-1].length;

                              newKey=newKey+"|"+vars.$G_opt_chm_init_impact_disp[change.initial_impact-1].substring(4,len);

                        }

                        if (i==3) newKey=newKey+"|"+change.opt_workType;

                        if (i==4) newKey=newKey+"|"+state;

                        if (i==5)

                        {

                              var timeofChange="Normal";

                              if (lib.ArrayUtil.indexOf(change.opt_otherSelectableItems,"After Hours")>=0) timeofChange="After Hours";

                              newKey=newKey+"|"+timeofChange;

                        }

                  }

            }

           

            //print("NewKey: "+newKey);

           

            if (lib.ArrayUtil.indexOf(keys,newKey)>=0)

            {

                  //print("Keys Match and add Auto Approval/Reviewer Groups ", apprDef.group_name.getText());

                  for (var k=0;k<apprDef.group_name.length();k++)

                        switch (apprDef.short_desc[k])

                        {

                              case "Approval Group":

                              if (lib.ArrayUtil.indexOf(change.approved_groups,apprDef.group_name[k])<0)

                              change.approved_groups.push(apprDef.group_name[k]);

                              break;

                       case "Outage Reviewer Group":

                              if (lib.ArrayUtil.indexOf(change.op_outageReviewers,apprDef.group_name[k])<0)

                              change.op_outageReviewers.push(apprDef.group_name[k]);

                              break;

                       case "Reviewer Group":

                              if (lib.ArrayUtil.indexOf(change.reviewer_class,apprDef.group_name[k])<0)

                              change.reviewer_class.push(apprDef.group_name[k]);

                              break;

                        }

            }

      }

}

 

function matchApprDefKeyforReviewers(change)

{

      var keys=new Array();

      for (var i=0;i<change.opt_selectableImpacts.length();i++)

      {

            var key="ApprReviewerRule-"+change.subcategory+"|"+change.opt_selectableImpacts[i];

            keys.push(key);

            //print("ApprReviewerRule Key["+i+"]: "+key);

      }

      var keystr="{\""+keys.toString().replace(/,/g,"\",\"")+"\"}";//print("Reviewer Rule Keys:"+keystr);

      var rule=new SCFile("ApprovalDef");

      var query="name isin "+keystr;

      var rc=rule.doSelect(query);

      while (rc==RC_SUCCESS)

      {

            //print("Auto Reviewer Rule found ("+rule.name+")")

          for (var k=0;k<rule.group_name.length();k++)

          {

                  switch (rule.short_desc[k])

                  {

                        case "Approval Group":

                        if (lib.ArrayUtil.indexOf(change.approved_groups,rule.group_name[k])<0)

                        change.approved_groups.push(rule.group_name[k]);

                        break;

                 case "Outage Reviewer Group":

                        if (lib.ArrayUtil.indexOf(change.op_outageReviewers,rule.group_name[k])<0)

                        change.op_outageReviewers.push(rule.group_name[k]);

                        break;

                 case "Reviewer Group":

                        if (lib.ArrayUtil.indexOf(change.reviewer_class,rule.group_name[k])<0)

                        change.reviewer_class.push(rule.group_name[k]);

                        break;

                  }    

          }

          rc=rule.getNext();

      }

 

}

 

function insertScheduleApprovalGroupsRisk(record)

{

      var newSchedule = new SCFile("schedule");

      var today = new Date();

      newSchedule._class="problem"

      newSchedule.name="updateApprovalGroupsRiskRating";

      newSchedule.expiration=today;

newSchedule.javascript="lib.optTestFilipe.ApprovalandReviewerGroups(\""+record.number+"\");"

      var rc = newSchedule.doInsert();

}

 

function insertScheduleApprovalGroups(record)

{

      var newSchedule = new SCFile("schedule");

      var today = new Date();

      newSchedule._class="problem"

      newSchedule.name="updateApprovalGroupsBasedOnRules";

      newSchedule.expiration=today;

newSchedule.javascript="lib.optTestFilipe.ApprovalandReviewerGroupsBasedOnRules(\""+record.number+"\");"

      var rc = newSchedule.doInsert();

}

 

function insertScheduleApprovalSite(record)

{

      var newSchedule = new SCFile("schedule");

      var today = new Date();

      newSchedule._class="problem"

      newSchedule.name="updateApprovalGroupsBasedOnRules";

      newSchedule.expiration=today;

newSchedule.javascript="lib.optTestFilipe.ApprovalandReviewerGroupsSiteRequired(\""+record.number+"\");"

      var rc = newSchedule.doInsert();

}

 

function ApprovalandReviewerGroupsBasedOnRules(number){

 

      var change = new SCFile("cm3r")

      var qry = change.doSelect("number=\""+number+"\"");

      if (qry == RC_SUCCESS){

     

            lib.optChangeMgmtUtility.AssignApprovalandReviewerGroupsBasedOnRules(change);

            change.doUpdate();

      }

}

 

function ApprovalandReviewerGroupsSiteRequired(number){

     

      var change = new SCFile("cm3r")

      var qry = change.doSelect("number=\""+number+"\"");

      if (qry == RC_SUCCESS){

     

            lib.optChangeMgmtUtility.updateApprovalGroup(change);

            change.doUpdate();

      }

}

 

 

function ApprovalandReviewerGroupsBasedOnRiskRating(number){

     

      var change = new SCFile("cm3r")

      var qry = change.doSelect("number=\""+number+"\"");

      if (qry == RC_SUCCESS){

     

            lib.optChangeMgmtUtility.AssignApprovalRiskRatingandRequestorGroup(change);

            lib.optChangeMgmtUtility.AssignApprovalandReviewerGroupsBasedOnRules(change);

            lib.optChangeMgmtUtility.updateApprovalGroup(change);

            change.doUpdate();

      }

}

 

function sltActiveNotifications(slt){

 

      var slo = new SCFile("slo")

      var qry = slo.doSelect("name=\""+slt+"\" and opt.active.notif=true");

      if (qry == RC_SUCCESS){

     

      print("true");

      return true;

 

      }else{

      print("false");

      return false;

      }

}

//sltActiveNotifications("P1 Mobile Network Faults , No truck Roll , Resolved within 4 hours")

 

 

function autoTriggerMissingCiActivity(affectedCI, number){

 

      var ci= new SCFile("device");

      var sql = ci.doSelect("logical.name=\""+affectedCI+"\"");

      if(sql == RC_SUCCESS && ci.display_name==="Generic CI"){

 

      var fAct = new SCFile("activity");

      fAct.number = number;

      fAct.datestamp = system.functions.tod();

      //fAct.datestamp = system.functions.parse_evaluate("tod() - '0 00:00:25",1);

      //fAct.operator = system.functions.operator();

      fAct.operator = vars.$lo_ufname;

      fAct.type = "Missing CI";

     

      var arrDesc = new Array();

      arrDesc[0] = "Affected CI is missing from CMDB, please check."

     

      fAct.description = arrDesc;

      fAct.cust_visible = false;

     

      //fAct.negdatestamp=system.functions.parse_evaluate("'31/12/2199 17:00:00' - tod()",1);

      fAct.negdatestamp=system.functions.tod();

      var rc = fAct.doInsert();

     

      }else{

return false;

}

}

 

function clearEventout(){

 

var feventout=new SCFile("eventout");

var sql = feventout.doSelect("evtime<=tod()-'1 00:00:00'")

//var count = feventout.doCount("evtime<=tod()-'1 00:00:00'")

//print(count);

while ( sql == RC_SUCCESS )

      {

            feventout.doDelete();

            print("ID - "+feventout.evsysseq);

            sql = feventout.getNext();

      }

 

}

 

function RelatedOpenTasks(PMID){

 

 

return true;

 

 

}