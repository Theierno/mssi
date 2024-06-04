import numpy as np
from flask import Flask, request, jsonify
from tensorflow.keras.applications.vgg16 import VGG16, preprocess_input
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import Model
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import OrdinalEncoder
from sklearn.preprocessing import StandardScaler
import json
app = Flask(__name__)

@app.route('/api/prediction', methods=['POST'])
def prediction():
    # Charger le modèle VGG16 pré-entraîné avec les poids de 'imagenet'
    base_model = VGG16(weights='imagenet')

    # Modifier le modèle pour utiliser la couche 'fc1' comme sortie pour l'extraction des caractéristiques
    model = Model(inputs=base_model.input, outputs=base_model.get_layer('fc1').output)

    # Chemins des images à comparer    
    image1_path = request.json['img1']
    image2_path = request.json['img2']

    # Extraire les caractéristiques des images en utilisant le modèle pré-entraîné
    features1 = extract_features(image1_path, model)
    features2 = extract_features(image2_path, model)

    # Calculer la similarité cosinus entre les vecteurs de caractéristiques des deux images
    similarity = cosine_similarity(features1, features2)

    # Afficher la similarité
    print(f"Similarity: {similarity}")


def extract_features(img_path, model):
    """
    Extrait les caractéristiques d'une image en utilisant un modèle pré-entraîné.

    Args:
    img_path (str): Le chemin vers l'image.
    model (Model): Le modèle pré-entraîné pour l'extraction des caractéristiques.

    Returns:
    np.ndarray: Un vecteur de caractéristiques de l'image.
    """
    # Charger l'image depuis le chemin donné et la redimensionner à la taille 224x224
    img = image.load_img(img_path, target_size=(224, 224))
    
    # Convertir l'image en tableau numpy
    img_data = image.img_to_array(img)
    
    # Ajouter une dimension supplémentaire pour correspondre à la forme attendue par le modèle
    img_data = np.expand_dims(img_data, axis=0)
    
    # Prétraiter l'image (normalisation des pixels, etc.) pour qu'elle soit compatible avec le modèle VGG16
    img_data = preprocess_input(img_data)
    
    # Utiliser le modèle pour prédire les caractéristiques de l'image
    features = model.predict(img_data)
    
    # Aplatir les caractéristiques en un vecteur 1D
    return features.flatten()

def cosine_similarity(feature_vector1, feature_vector2):
    """
    Calcule la similarité cosinus entre deux vecteurs de caractéristiques.

    Args:
    feature_vector1 (np.ndarray): Le premier vecteur de caractéristiques.
    feature_vector2 (np.ndarray): Le deuxième vecteur de caractéristiques.

    Returns:
    float: La similarité cosinus entre les deux vecteurs.
    """
    # Calculer le produit scalaire entre les deux vecteurs
    dot_product = np.dot(feature_vector1, feature_vector2)
    
    # Calculer la norme (longueur) de chaque vecteur
    norm1 = np.linalg.norm(feature_vector1)
    norm2 = np.linalg.norm(feature_vector2)
    
    # Calculer et retourner la similarité cosinus
    return dot_product / (norm1 * norm2)

