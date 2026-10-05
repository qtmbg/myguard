import json,pathlib,re,xml.etree.ElementTree as ET
import jsonschema,yaml
root=pathlib.Path(__file__).resolve().parents[1]
# Schemas are fetched fresh from their declared official version, or supplied offline.
import urllib.request,sys
schemas={}
for k in ['plugin','mcp']:
 schemas[k]=json.loads(urllib.request.urlopen(f'https://agent-plugins.org/schemas/1.0.0/{k}.schema.json',timeout=30).read())
results=[]
for folder in sorted((root/'plugins').iterdir()):
 d=json.loads((folder/'plugin.json').read_text());m=json.loads((folder/'mcp.json').read_text());errors=[]
 for obj,k in [(d,'plugin'),(m,'mcp')]:
  errors += [e.message for e in jsonschema.Draft202012Validator(schemas[k]).iter_errors(obj)]
 o=d['extensions']['com.openai'];i=o['interface'];r=o['review'];p=o['publication']
 for field,limit in [('displayName',50),('shortDescription',30),('longDescription',4000),('developerName',80)]:
  if not isinstance(i.get(field),str) or not 0<len(i[field])<=limit:errors.append(f'{field} outside length limit {limit}')
 for field in ['websiteURL','supportURL','privacyPolicyURL','termsOfServiceURL']:
  if not i.get(field,'').startswith('https://'):errors.append(field+' requires HTTPS')
 for field in ['logo','composerIcon']:
  a=ET.parse(folder/i[field]).getroot();w=float(a.attrib['width']);h=float(a.attrib['height'])
  if w!=h or w<48:errors.append(field+' invalid square dimensions')
 if len(r['test_cases']['positive'])!=5 or len(r['test_cases']['negative'])!=3:errors.append('Requires 5 positive and 3 negative cases')
 if not p.get('release_notes'):errors.append('Missing release notes')
 skill_results=[]
 for skill in (folder/'skills').glob('*/SKILL.md'):
  text=skill.read_text();front=yaml.safe_load(text.split('---')[1]);ok=bool(re.fullmatch('[a-z0-9-]{1,64}',front.get('name',''))) and 0<len(front.get('description',''))<=1024
  if not ok:errors.append('Invalid skill frontmatter '+str(skill))
  skill_results.append({'name':front['name'],'frontmatter':'pass' if ok else 'fail'})
 if not (folder/o['onboardingSkill']).is_file():errors.append('onboarding skill missing')
 if len(m['mcpServers'])!=1:errors.append('Exactly one MCP required')
 results.append({'plugin':d['name'],'local_package_validation':'pass' if not errors else 'fail','errors':errors,'skills':skill_results,'official_portal_scans':'not run: portal browser permission declined'})
 print(d['name'], 'PASS' if not errors else errors)
(root/'review'/'package-validation.json').write_text(json.dumps(results,indent=2)+'\n')
if any(r['errors'] for r in results):sys.exit(1)
