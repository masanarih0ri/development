<?php
$key = $_POST["key"];
// exec('curl --header "Authorization: key='.$key.'" --header Content-Type:"application/json" https://android.googleapis.com/gcm/send -d "{\"registration_ids\":[\"c6Xq1U5C4hU:APA91bHb5lPErP4LQG4FP30M05Eyly2FbuAn5cDp1LLJJBv6EQLt0fSsRxu5fUd3-W8ogNXGo-ItDKEnt_McQmtPfLhrGwve7lAClHDe7gIpM3CZhSfbV3eyeIYRFxGwVdNlSaOzkiTC\"]}"');
// exec('curl --header "Authorization: key='.$key.'" --header Content-Type:"application/json" https://android.googleapis.com/gcm/send -d "{\"registration_ids\":[\"epr-MEmF4Zo:APA91bETH5-IR2BHTpweX1K_MJgHP0660XpyPw40v5fwG0722qtO41Lc14vf5l89YqJJ-gMB3CYXqGQ2ZEykwth9pjKHIfSAlc6QjZQTkQgeP7chhk4zm4_Qpa2tauqfl5506dliNzVO\"]}"')
// exec('curl --header "Authorization: key='.$key.'" --header Content-Type:"application/json" https://android.googleapis.com/gcm/send -d "{\"registration_ids\":[\"fHxGPnecmNY:APA91bEIEMM2eYhydhQCavD6h02Q7MWRa1xNDDZIcASQUFVSjuV-_uC0ktPq43w37Us3tDRQNqcnxGmcHV6X2-OnETyvd9FV6DHfzUlRMOFwogPP36HMubIBW9M2YsAlMX-EKoKuwlei\"]}"')
exec('curl --header "Authorization: key='.$key.'" --header Content-Type:"application/json" https://android.googleapis.com/gcm/send -d "{\"registration_ids\":[\"fHxGPnecmNY:APA91bEIEMM2eYhydhQCavD6h02Q7MWRa1xNDDZIcASQUFVSjuV-_uC0ktPq43w37Us3tDRQNqcnxGmcHV6X2-OnETyvd9FV6DHfzUlRMOFwogPP36HMubIBW9M2YsAlMX-EKoKuwlei\"]}"')
?>
