export function getNameFromRow(profile) {
  var input = profile.string;
  input = input.split('\n');

  var name = input[1].split('=');
  //* Strip Quotes
  name = name[1];
  name = name.substring(1, name.length - 1);
  return name;
}

export function getRegionFromRow(profile) {
  var input = profile.string;
  input = input.split('\n');

  var region = input[4].split('=');
  //* Make uppercase
  region = region[1];
  region = region.toUpperCase();

  return region;
}

export function getServerFromRow(profile) {
  var input = profile.string;
  input = input.split('\n');

  var server = input[5].split('=');
  //* Capitalise first letter
  server = server[1];
  server = server.charAt(0).toUpperCase() + server.slice(1);
  return server;
}
