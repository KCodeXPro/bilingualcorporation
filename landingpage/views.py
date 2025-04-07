
from django.shortcuts import render
from django.core.mail import EmailMessage
from django.http import HttpResponse
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import redirect
from django.template.loader import render_to_string
import base64
import os
from django.templatetags.static import static




def landingpage(request): 
     return render(request, 'landingpage/landingpage.html')
        
def terminosdeservicio(request):
  return render(request, 'landingpage/terminosdeservicio.html') 

def politicadeprivacidad(request):
  return render(request, 'landingpage/politicadeprivacidad.html')




def enviar_correo(request):
    if request.method == 'POST':
        nombre = request.POST.get('name')
        email = request.POST.get('email')
        asunto = request.POST.get('subject')
        mensaje = request.POST.get('message')
        documento = request.FILES.get('document')

        
        imagen_base64url = request.build_absolute_uri(static('landingpage/img/Talent_Seekers_header_image.png'))


        # Renderiza el cuerpo del correo usando la plantilla
        email_body = render_to_string('landingpage/email_template.html', {
            'nombre': nombre,
            'email': email,
            'asunto': asunto,
            'mensaje': mensaje,
            'imagen_base64': imagen_base64url, 
            
        })

        # Configura el email
        email_message = EmailMessage(
            subject=asunto,
            body=email_body,
            from_email=settings.EMAIL_HOST_USER,
            to=['kervanalvarez@gmail.com'],  # Cambia esto por la dirección de destino
        )
        email_message.content_subtype = 'html'  # Especifica que el contenido es HTML

        # Adjuntar el documento si existe
        if documento:
            email_message.attach(documento.name, documento.read(), documento.content_type)

        # Envía el correo
        email_message.send()

        # Respuesta de éxito
        return JsonResponse({'status': 'success', 'message': '¡Mensaje enviado con éxito!'})

    # Si no es un método POST, retorna un mensaje de error
    return JsonResponse({'status': 'error', 'message': 'Método no permitido.'}, status=405)



def image_to_base64(image_path):
    # Construir la ruta completa de la imagen
    full_path = os.path.join(settings.STATIC_ROOT, image_path)
    
    with open(full_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        return f"data:image/png;base64,{encoded_string}"

       