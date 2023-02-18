import json

def ordCidade(c):
    return c['nome']

def ordLigacao(l):
    return l['distância']

def idToNome(id):
    for c in cidades:
        if c['id'] == id:
            return c['nome']
    return None


f = open("mapa.json")
data = json.load(f)
cidades = data['cidades']
ligacoes = data['ligações']
cidades.sort(key=ordCidade)
ligacoes.sort(key=ordLigacao)

pagWeb = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Mapa Virtual</h1>
        <table>
            <tr>
                <td width="30%" valign="top">
                    <h3>Índice</h3>
                    <a name="indice"/>
                    <!-- Lista com o índice -->
                    <ul>
"""

for c in cidades:
    pagWeb += f"""
        <li>
            <a href="#{c['id']}">{c['nome']}</a> 
        </li>
    """

pagWeb += """
</ul>
                </td>
                <td width="70%">
"""
for c in cidades:
    
    pagWeb += f"""
                    <a name="{c['id']}"/>
                    <h3>{c['nome']}</h3>
                    <p><b>população:</b> {c['população']}</p>
                    <p><b>descrição:</b> {c['descrição']}</p>
                    <p><b>distrito:</b> {c['distrito']}</p>
                    <address>[<a href="#indice">Voltar ao índice</a>]</address>
                    <center>
                        <hr width="80%"/>
                    </center> 
                    <ul>
    """
    for l in ligacoes:
        if l['origem'] == c['id']:
            pagWeb += f"""
                <li>
                    <a href="#{l['destino']}">{idToNome(l['destino'])}</a> {l['distância']}km
                </li>
            """
        elif l['destino'] == c['id']:
            pagWeb += f"""
                <li>
                    <a href="#{l['origem']}">{idToNome(l['origem'])}</a> {l['distância']}km
                </li>
            """
    
    pagWeb += f"""
                    </ul>
    """

pagWeb += """      
                </td>
            </tr>
        </table>
    </body>
</html>
"""
                    
print(pagWeb)