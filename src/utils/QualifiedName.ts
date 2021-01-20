import { QualifiedName } from '../types';

export function browsePathToString(qnames: QualifiedName[], nsTable: string[]): string {
  let path = '';
  if (typeof qnames !== 'undefined') {
    for (let i = 0; i < qnames.length; i++) {
        path += qualifiedNameToIndexString(qnames[i], nsTable);
      if (i < qnames.length - 1) {
        path += '/';
      }
    }
  }
  console.log("path: " + path);
  return path;
}

export function browsePathToShortString(qnames: QualifiedName[]): string {
  let path = '';
  if (typeof qnames !== 'undefined') {
    for (let i = 0; i < qnames.length; i++) {
      path += qnames[i].name;
      if (i < qnames.length - 1) {
        path += '/';
      }
    }
  }
  return path;
}

function qualifiedNameToIndexString(qname: QualifiedName, nsTable: string[]): string {
    return nsTable.indexOf(qname.namespaceUrl) + ':' + qname.name;
}


export function qualifiedNameToString(qname: QualifiedName): string {
  return qname.namespaceUrl + ':' + qname.name;
}

export function stringToBrowsePath(path: string, nsTable: string[]): QualifiedName[] {
  path = path.trim();
  if (path.length === 0) {
    return [];
  }
  var paths = path.split('/');
    let browsepath: QualifiedName[] = paths.map((a: string) => toQualifiedNameFromIndex(a, nsTable));
  return browsepath;
}


function toQualifiedNameFromIndex(path: string, nsTable: string[]): QualifiedName {
    var ns = path.split(':');
    if (ns.length > 1) {
        let idx = parseInt(ns[0]);
        let namespaceUrl = '';
        if (!isNaN(idx) && idx >= 0 && idx < nsTable.length) {
            namespaceUrl = nsTable[idx];
        }
        return { name: ns[1].trim(), namespaceUrl: namespaceUrl };
    }
    return { name: ns[0].trim(), namespaceUrl: '' };
}

export function toQualifiedName(path: string): QualifiedName {
  var ns = path.split(':');
  if (ns.length > 1) {
    return { name: ns[1].trim(), namespaceUrl: ns[0].trim() };
  }
  return { name: ns[0].trim(), namespaceUrl: '' };
}

export function copyQualifiedName(qm: QualifiedName): QualifiedName {
  return { name: qm.name, namespaceUrl: qm.namespaceUrl };
}
