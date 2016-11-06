function isValidSubscriber(subscriber) {
  if (subscriber.login === ''
      || subscriber.password === ''
      || subscriber.firstname === ''
      || subscriber.lastname === ''
      || subscriber.mail === '') {
    return false;
  }
  if (subscriber.password !== subscriber.confirmedPassword) {
    return false;
  }
  return true;
};

function isValidUser(user) {
  if (user.login === '' || user.password === '') {
    return false;
  }
  return true;
};