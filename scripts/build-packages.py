import pathlib,zipfile,json,hashlib
root=pathlib.Path(__file__).resolve().parents[1];dest=root/'releases';dest.mkdir(exist_ok=True);rows=[]
for folder in sorted((root/'plugins').iterdir()):
 name=folder.name;out=dest/f'{name}-v1.0.0.zip'
 with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as z:
  for p in sorted(folder.rglob('*')):
   if p.is_file():
    rel=p.relative_to(folder).as_posix()
    assert rel in ['plugin.json','mcp.json'] or rel.startswith(('skills/','assets/'))
    info=zipfile.ZipInfo(rel,(2026,10,5,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o100644<<16
    z.writestr(info,p.read_bytes())
 with zipfile.ZipFile(out) as z:
  assert 'plugin.json' in z.namelist() and 'mcp.json' in z.namelist()
  assert len([n for n in z.namelist() if n.endswith('/SKILL.md')])>=1
 rows.append({'plugin':name,'filename':out.name,'bytes':out.stat().st_size,'sha256':hashlib.sha256(out.read_bytes()).hexdigest(),'archive_root':'plugin.json, mcp.json, skills/, assets/'})
 print(name,out.stat().st_size)
(dest/'checksums.json').write_text(json.dumps(rows,indent=2)+'\n')
