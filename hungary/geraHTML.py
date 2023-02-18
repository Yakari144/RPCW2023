import json

def ordCidade(c):
    return c['city']


f = open("hu.json")
data = json.load(f)
data.sort(key=ordCidade)

pagWeb = """
<!DOCTYPE html>
<html>
    <head>
        <title>Hungria</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Hungria</h1>
        <table>
            <tr>
                <td width="30%" valign="top">
                    <h3>Índice</h3>
                    <a name="indice"/>
                    <!-- Lista com o índice -->
                    <ul>
"""

for c in data:
    pagWeb += f"""
        <li>
            <a href="#{c['city']}">{c['city']}</a> 
        </li>
    """

pagWeb += """
</ul>
                </td>
                <td width="70%">
"""

def floatToDMS(value):
    value = float(value)
    degrees = int(value)
    submin = abs((value - degrees) * 60)
    minutes = int(submin)
    seconds = int((submin - minutes) * 60)
    return str(degrees) + "º " + str(minutes) + "' " + str(seconds) + '"'

# given float longitude and latitude, return the coordinates with the right format with grade, minutes and seconds
def getCoordenadas(lat, lng):
    lat = floatToDMS(lat)
    lng = floatToDMS(lng)
    return lat + "N, " + lng + "E"


for c in data:
    
    pagWeb += f"""
                    <a name="{c['city']}"/>
                    <h3>{c['city']}</h3>
                    <p><b>Coordenadas:</b> {getCoordenadas(c['lat'],c['lng'])}</p>
                    <p><b>Condado:</b> {c['admin_name']}</p>
                    <p><b>População:</b> {c['population_proper']}</p>
                    <address>[<a href="#index">Voltar ao Índice</a>]</address>
                    <center>
                        <hr width="80%"/>
                    </center>
    """

pagWeb += """      
                </td>
            </tr>
        </table>
    </body>
</html>
"""
                    
print(pagWeb)