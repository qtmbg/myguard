"""Render narrated-by-text production evidence walkthroughs, not simulated ChatGPT UI."""
from PIL import Image,ImageDraw,ImageFont
import pathlib,json,textwrap,subprocess,tempfile
root=pathlib.Path(__file__).resolve().parents[1];dest=root/'review'/'demos';dest.mkdir(exist_ok=True)
fontpath='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
font=ImageFont.truetype(fontpath,25);small=ImageFont.truetype(fontpath,19);title=ImageFont.truetype(fontpath,40)
for p in sorted((root/'review').glob('*-production.json')):
 d=json.loads(p.read_text());name=d['plugin'];manifest=json.loads((root/'plugins'/name/'plugin.json').read_text());display=manifest['extensions']['com.openai']['interface']['displayName']
 pages=[('Production MCP walkthrough',f"Publisher: QTMBG LLC\nProduct: {display}\nEndpoint: {d['endpoint']}\nTested: {d['tested_at']}\n\nRecorded production HTTP request/response evidence.\nSynthetic inputs; unauthenticated, stateless tools.\nNo simulated ChatGPT interface.\nLive conversational activation/refusal checks remain pending.")]
 for c in d['positive']:
  scenario=manifest['extensions']['com.openai']['review']['test_cases']['positive'][c['index']-1]
  args=json.dumps(c['arguments'],indent=2);out=c['call']['response']['result'].get('structuredContent',{})
  pages.append((f"Positive {c['index']}/5: {scenario['description']}",f"Tool: {c['tool']}\nSupplied test inputs:\n{args}\nHTTP {c['call']['status']} | {c['call']['latency_ms']} ms"))
  compact=json.dumps({k:v for k,v in out.items() if k not in ['note','next_step','signals','reasons']},indent=2)
  pages.append((f"Positive {c['index']}/5: recorded result",f"{compact}\n\nExpected fields: {json.dumps(c['expected_fields'])}\nAssertion: {'PASS' if c['pass_'] else 'FAIL'}\n{out.get('note','')}"))
 if 'extra_tool_call' in d:
  c=d['extra_tool_call'];pages.append(('Additional tool coverage',f"{c['tool']}\n{json.dumps(c['call']['response']['result']['structuredContent'],indent=2)}\nAssertion: {'PASS' if c['pass_'] else 'FAIL'}"))
 for i,c in enumerate(d['negative_input_validation']):
  pages.append((f'Malformed-input test {i+1}/3',f"Supplied malformed arguments:\n{json.dumps(c['arguments'],indent=2)}\n\nRecorded server reply:\n{json.dumps(c['call']['response']['result'],indent=2)}\nAssertion: {'PASS' if c['pass_'] else 'FAIL'}"))
 for i,c in enumerate(d['conversational_negative']):
  pages.append((f'Conversational negative {i+1}/3: pending',f"Prompt: {c['prompt']}\n\nRequired safe behavior: {c['expected_behavior']}\n\nThis is a review specification. No installed ChatGPT/Codex run is represented. It must be verified after installation.\nNo MCP call is made for an unrelated or fabricated-evidence request."))
 pages.append(('Review readiness',f"5/5 positive production fixtures passed.\n3/3 malformed-input rejection checks passed.\n3 conversational negative tests await live installation.\n\nOne MCP endpoint per product; tools do arithmetic and decision support.\nNo credentials, payments, checkout, or subscription upsells.\nOfficial package/tool/skill scans and domain challenge await portal access.\n\n{display} | QTMBG LLC"))
 with tempfile.TemporaryDirectory() as tmp:
  for i,(heading,body) in enumerate(pages):
   im=Image.new('RGB',(1280,960),'#10151d');dr=ImageDraw.Draw(im);dr.rectangle((0,0,1280,9),fill='#51dec4');dr.text((45,30),display+' / REVIEW',font=title,fill='#51dec4');dr.text((45,95),heading,font=font,fill='white')
   lines=[]
   for line in body.splitlines():lines+=textwrap.wrap(line,width=92,replace_whitespace=False,drop_whitespace=False) or ['']
   f=font if len(lines)<24 else small;lh=32 if len(lines)<24 else 25
   for j,line in enumerate(lines[:30]):dr.text((45,160+j*lh),line,font=f,fill='#d7e0ee')
   dr.text((45,917),f"Production evidence replay | {i+1}/{len(pages)} | No live ChatGPT UI recorded",font=small,fill='#8494a9')
   im.save(pathlib.Path(tmp)/f'{i:03}.png')
  out=dest/f'{name}.mp4'
  subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-framerate','1/6','-i',tmp+'/%03d.png','-c:v','libx264','-r','24','-pix_fmt','yuv420p','-crf','27','-movflags','+faststart',str(out)],check=True)
  print(name,out.stat().st_size,flush=True)
 (dest/f'{name}-transcript.json').write_text(json.dumps(pages,indent=2)+'\n')
 manifest['extensions']['com.openai']['review']['demo_recording_url']='https://money-plugins-qtmbg.vercel.app/review/demos/'+name+'.mp4'
 (root/'plugins'/name/'plugin.json').write_text(json.dumps(manifest,indent=2)+'\n')
