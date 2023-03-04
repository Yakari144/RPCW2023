import json

file = open("dataset-extra1.json", "r")
pessoas = json.load(file)
file.close()

i=1
for p in pessoas['pessoas']:
    if "id" not in p:
        p['id'] = "p"+str(i)
    i+=1

# solucao stor:
# for index, p in enumerate(pessoas['pessoas']):
#     p['id'] = "p"+str(index+1)

f2 = open("dataset-extra1.json", "w")
json.dump(pessoas, f2)
f2.close()

print("adicionados "+str(i)+" identificadores")