function setHeadersForCrossDomainIssues(res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization, x-custom-token , X-XSRF-TOKEN");
    res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE,OPTIONS");
    return res;
  }
  
  
  //= ========================= Export Module Start ===========================
  
  module.exports = {
    setHeadersForCrossDomainIssues,
  };
  
  //= ========================= Export Module End===========================
  