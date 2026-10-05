import pathlib,json,urllib.request,concurrent.futures,datetime,time,sys
root=pathlib.Path(__file__).resolve().parents[1]
base='https://money-plugins-qtmbg.vercel.app'
def rpc(plugin,method,params=None):
 payload={'jsonrpc':'2.0','id':1,'method':method}
 if params is not None:payload['params']=params
 req=urllib.request.Request(base+'/api/'+plugin+'/mcp',data=json.dumps(payload).encode(),headers={'Content-Type':'application/json','Accept':'application/json, text/event-stream'})
 start=time.monotonic()
 with urllib.request.urlopen(req,timeout=45) as res:return {'status':res.status,'latency_ms':round((time.monotonic()-start)*1000),'response':json.loads(res.read()),'request_id':res.headers.get('x-vercel-id')}
def run(folder):
 name=folder.name;manifest=json.loads((folder/'plugin.json').read_text());cases=json.loads((root/'review'/f'{name}-fixtures.json').read_text())
 result={'plugin':name,'tested_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'endpoint':base+'/api/'+name+'/mcp','test_mode':'direct production MCP; conversational activation and refusal not tested','initialize':rpc(name,'initialize',{'protocolVersion':'2025-06-18','capabilities':{},'clientInfo':{'name':'qtmbg-review-tests','version':'1.0.0'}}),'tools':rpc(name,'tools/list'),'positive':[],'negative_input_validation':[],'conversational_negative':[]}
 tools=result['tools']['response']['result']['tools'];names=[t['name'] for t in tools];assert len(set(names))==len(names)
 for t in tools:
  assert t['description'] and t['inputSchema']['type']=='object'
  assert t['annotations']==dict(readOnlyHint=True,destructiveHint=False,idempotentHint=True,openWorldHint=False)
 for c in cases:
  assert c['tool'] in names
  call=rpc(name,'tools/call',{'name':c['tool'],'arguments':c['arguments'],'_meta':{'openai/locale':'en-US'}})
  out=call['response']['result'];actual=out.get('structuredContent',{});ok=not out['isError'] and all(actual.get(k)==v for k,v in c['expected_fields'].items())
  result['positive'].append(dict(c,prompt=manifest['extensions']['com.openai']['review']['test_cases']['positive'][c['index']-1]['prompt'],call=call,pass_=ok))
 # Validate actual rejection rather than interpreting missing facts as zeros.
 first=cases[0];invalids=[dict(first['arguments'],unexpected_field='invalid')]
 reqs=tools[0]['inputSchema'].get('required',[])
 if reqs:
  a=dict(first['arguments']);a.pop(reqs[0],None);invalids.append(a)
 else:invalids.append({'arrival_delay_minutes':-1})
 numeric=next((k for k,v in first['arguments'].items() if isinstance(v,(int,float)) and not isinstance(v,bool)),None)
 a=dict(first['arguments']);a[numeric or 'arrival_delay_minutes']='wrong type';invalids.append(a)
 for args in invalids:
  call=rpc(name,'tools/call',{'name':first['tool'],'arguments':args});result['negative_input_validation'].append({'arguments':args,'call':call,'pass_':call['response'].get('result',{}).get('isError') is True})
 for c in manifest['extensions']['com.openai']['review']['test_cases']['negative']:
  result['conversational_negative'].append(dict(c,status='pending live ChatGPT/Codex install; specification inspected only'))
 # Ensure additional tools not used in the 5 scenarios are exercised too.
 extra={'scopeguard':('price_scope',cases[0]['arguments'],{'expected_price':4950}),'refundradar':('calculate_potential_recovery',{'base_amount':100,'refundable_fees':12,'additional_credits':3},{'potential_recovery':115}),'travelclaim':('calculate_documented_travel_expenses',{'items':[{'label':'hotel','amount':100},{'label':'meal','amount':25}]},{'total_documented_expenses':125})}
 if name in extra:
  tool,args,expected=extra[name];call=rpc(name,'tools/call',{'name':tool,'arguments':args});result['extra_tool_call']={'tool':tool,'call':call,'pass_':all(call['response']['result']['structuredContent'].get(k)==v for k,v in expected.items())}
 (root/'review'/f'{name}-production.json').write_text(json.dumps(result,indent=2)+'\n')
 print(name,'positive',sum(c['pass_'] for c in result['positive']),'/5; input rejection',sum(c['pass_'] for c in result['negative_input_validation']),'/3',flush=True)
 return result
folders=[f for f in sorted((root/'plugins').iterdir()) if len(sys.argv)==1 or f.name in sys.argv[1:]]
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:list(pool.map(run,folders))
results=[json.loads(p.read_text()) for p in sorted((root/'review').glob('*-production.json'))]
summary={'tested_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'positive_pass':sum(sum(c['pass_'] for c in r['positive']) for r in results),'positive_total':50,'input_rejection_pass':sum(sum(c['pass_'] for c in r['negative_input_validation']) for r in results),'input_rejection_total':30,'conversational_negative_executed':0,'official_scans_executed':0}
(root/'review'/'production-summary.json').write_text(json.dumps(summary,indent=2)+'\n');print(summary)
if summary['positive_pass']!=50 or summary['input_rejection_pass']!=30:sys.exit(1)
