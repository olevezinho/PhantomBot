!function(){var n=$.inidb.exists("donations","announce")?$.getIniDbBoolean("donations","announce"):!0,e=parseFloat($.inidb.exists("donations","reward")?$.inidb.get("donations","reward"):0),a="./addons/donationHandler";$.bind("twitchAlertsDonationInitialized",function(){$.bot.isModuleEnabled("./handlers/donationHandler.js")&&($.isDirectory(a)||($.consoleLn(">> Creating Donation Handler Directory: "+a),$.mkDir(a)),$.consoleLn(">> Enabling Twitch Alerts donation announcements"),n=!0)}),$.bind("twitchAlertsDonation",function(i){if($.bot.isModuleEnabled("./handlers/donationHandler.js")){var o=i.getJsonString(),t=Packages.org.json.JSONObject,s=new t(o),r=s.getString("donation_id"),d=(s.getString("created_at"),s.getString("currency")),l=parseFloat(s.getString("amount")),g=s.getString("name");s.getString("message");if(!$.inidb.exists("donations",r)&&($.inidb.set("donations",r,s),$.inidb.set("donations","last_donation",r),$.writeToFile(g+": "+l.toFixed(2),a+"/latestDonation.txt",!1),n))if(e>0&&$.bot.isModuleEnabled("./systems/pointSystem.js")){var c=Math.round(l*e),u=$.inidb.exists("donations","rewardmessage")?$.inidb.get("donations","rewardmessage"):$.lang.get("donationhandler.donation.newreward");u=u.replace("(name)",g),u=u.replace("(amount)",l.toFixed(2)),u=u.replace("(points)",c.toString()),u=u.replace("(pointname)",(1==c?$.pointNameSingle:$.pointNameMultiple).toLowerCase()),u=u.replace("(currency)",d),$.say(u),$.inidb.exists("points",g.toLowerCase())&&$.inidb.incr("points",g.toLowerCase(),c)}else{var u=$.inidb.exists("donations","message")?$.inidb.get("donations","message"):$.lang.get("donationhandler.donation.new");u=u.replace("(name)",g),u=u.replace("(amount)",l.toFixed(2)),u=u.replace("(currency)",d),$.say(u)}}}),$.bind("command",function(a){var i=a.getSender().toLowerCase(),o=a.getCommand(),t=a.getArgs();if(o.equalsIgnoreCase("lastdonation")){if(!$.inidb.exists("donations","last_donation"))return void $.say($.whisperPrefix(i)+$.lang.get("donationhandler.lastdonation.no-donations"));var s=$.inidb.get("donations","last_donation");if(!$.inidb.exists("donations",s))return void $.say($.whisperPrefix(i)+$.lang.get("donationhandler.lastdonation.404"));var r=$.inidb.get("donations",s),d=Packages.org.json.JSONObject,l=new d(r),s=l.getString("donation_id"),g=(l.getString("created_at"),l.getString("currency")),c=parseFloat(l.getString("amount")),u=l.getString("name"),b=(l.getString("message"),$.inidb.exists("donations","lastmessage")?$.inidb.get("donations","lastmessage"):$.lang.get("donationhandler.lastdonation.success"));b=b.replace("(name)",u),b=b.replace("(amount)",c.toFixed(2)),b=b.replace("(currency)",g),$.say(b)}if(o.equalsIgnoreCase("donations")){if(!t[0])return void $.say($.whisperPrefix(i)+$.lang.get("donationhandler.donations.usage"));if(t[0].equalsIgnoreCase("announce"))return void(n?($.say($.whisperPrefix(i)+$.lang.get("donationhandler.donations.announce.disable")),n=!1,$.inidb.set("donations","announce","false")):($.say($.whisperPrefix(i)+$.lang.get("donationhandler.donations.announce.enable")),n=!0,$.inidb.set("donations","announce","true")));if(t[0].equalsIgnoreCase("reward"))return t[1]?isNaN(t[1])?void $.say($.whisperPrefix(i)+$.lang.get("donationhandler.donations.reward.usage")):($.say($.whisperPrefix(i)+$.lang.get("donationhandler.donations.reward.success",t[1],("1"==t[1]?$.pointNameSingle:$.pointNameMultiple).toLowerCase())),$.inidb.set("donations","reward",t[1]),void(e=parseFloat(t[1]))):void $.say($.whisperPrefix(i)+$.lang.get("donationhandler.donations.reward.usage"));if(t[0].equalsIgnoreCase("message")||t[0].equalsIgnoreCase("rewardmessage")||t[0].equalsIgnoreCase("lastmessage")){var m=t[0].toLowerCase();if(!t[1])return void $.say($.whisperPrefix(i)+$.lang.get("donationhandler.donations."+m+".usage"));var p=t.splice(1).join(" ");if(-1==p.search(/\(name\)/))return void $.say($.whisperPrefix(i)+$.lang.get("donationhandler.donations."+m+".no-name"));$.inidb.set("donations",m,p),$.say($.whisperPrefix(i)+$.lang.get("donationhandler.donations."+m+".success",p))}}}),$.bind("initReady",function(){$.bot.isModuleEnabled("./handlers/donationHandler.js")&&($.registerChatCommand("./handlers/donationHandler.js","lastdonation",7),$.registerChatCommand("./handlers/donationHandler.js","donations",1))})}();
