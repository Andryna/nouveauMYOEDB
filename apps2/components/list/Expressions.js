import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import ActionButton from '../buttons/ActionButton';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import config from '../../../config.json';
import { getLanguageCode } from '../../utils/All';
import { TranslatorConfiguration, TranslatorFactory, ProviderTypes } from 'react-native-power-translator';
import Tts from 'react-native-tts';

const base_url = config.base_url;

const ExpressionItem = ({
  id_stag, id, or: initialOr, ci: initialCi, id_category,
  deleteItem, show, showReader, origin_table, updateExpression,
  target_langue_cible, langue
}) => {
  // ——— Hooks ———
  const [or, setOr] = useState(initialOr);
  const [ci, setCi] = useState(initialCi);
  const [change, setChange] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [orHeight, setOrHeight] = useState(40);
  const [ciHeight, setCiHeight] = useState(40);

  const dispatch = useDispatch();

  // ——— Fonctions utilitaires ———
  const handleDone = () => {
    Keyboard.dismiss();
    if (change) {
      saveEdit();
      setChange(false);
    }
  };

  const saveEdit = () => {
    if (origin_table === 'expression_stagiaire') saveEditExp();
    else saveEditRec();
  };

  const saveEditExp = async () => {
    try {
      const response = await fetch(`${base_url}/portail-stagiaire/update.php`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id_stag, idexp: id, expres: or, traduction: ci, idecat: id_category }),
      });
      const text = await response.text();
      let data;
      try { data = JSON.parse(text); } 
      catch (e) { data = { message: text }; }
      if (!data.error) updateExpression(id, or, ci);
    } catch (err) { console.error(err); alert('Erreur réseau ou serveur'); }
  };

  const saveEditRec = () => {
    fetch(`${base_url}/portail-stagiaire/updateRec.php`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id_stag, idexp: id, expres: or, traduction: ci, idecat: id_category }),
    })
      .then(res => res.json())
      .then(() => updateExpression(id, or, ci))
      .catch(err => console.error(err));
  };

  const handleTranslateOr = async (text) => {
    setOr(text);
    setChange(true);
    const { targetLangue } = getLanguageCode(target_langue_cible);
    if (!text.trim()) return;
    try {
      TranslatorConfiguration.setConfig(
        ProviderTypes.Google,
        config.googleCloud.apiKey,
        targetLangue ? targetLangue.substring(0, 2) : 'en'
      );
      const translator = TranslatorFactory.createTranslator();
      const translated = await translator.translate(text);
      setCi(translated);
      Tts.setDefaultLanguage(langue || 'fr-FR');
    } catch (err) { console.error('Erreur traduction:', err); }
  };

  const updateField = (field, value) => {
    if (field === 'or') handleTranslateOr(value);
    if (field === 'ci') setCi(value);
    setChange(true);
  };

  // ——— Render ———
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container} pointerEvents="box-none">

        {editingId === `${id}_origine` ? (
          <TextInput
            value={or || ''}
            onChangeText={t => updateField('or', t)}
            onBlur={() => setEditingId(null)}
            autoFocus
            multiline
            style={[styles.input, { height: Math.max(40, orHeight) }]}
            returnKeyType="done"
            onSubmitEditing={handleDone}
            blurOnSubmit
            placeholder="Langue d'origine"
            onContentSizeChange={e => setOrHeight(e.nativeEvent.contentSize.height)}
          />
        ) : (
          <TouchableOpacity onPress={() => setEditingId(`${id}_origine`)}>
            <Text style={styles.text}>{or || ''}</Text>
          </TouchableOpacity>
        )}

        <View style={styles.separator} />

        {editingId === `${id}_cible` ? (
          <TextInput
            value={ci || ''}
            onChangeText={t => updateField('ci', t)}
            onBlur={() => setEditingId(null)}
            autoFocus
            multiline
            style={[styles.input, { height: Math.max(40, ciHeight) }]} // Hauteur dynamique
            returnKeyType="done"
            onSubmitEditing={handleDone}
            blurOnSubmit
            placeholder="Langue cible"
            onContentSizeChange={e => setCiHeight(e.nativeEvent.contentSize.height)} // Met à jour la hauteur
          />
        ) : (
          <TouchableOpacity onPress={() => setEditingId(`${id}_cible`)}>
            <Text style={styles.text}>{ci || ''}</Text>
          </TouchableOpacity>
        )}


        <ActionButton
          onEdit={() => show(id, or, ci)}
          onReader={() => showReader(id, or, ci)}
          onDelete={() => deleteItem(id)}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderBottomWidth: 1,
    width: wp('90%'),
    backgroundColor: '#202C61',
    alignSelf: 'center',
    marginBottom: 5,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    color: '#edecf4ff',
    textAlign: 'justify',
    padding: 5,
    flex: 1,
  },
  input: {
    backgroundColor: '#f1f1edff',
    fontSize: 16,
    paddingVertical: 4,
    padding: 5,
    textAlign: 'justify',
    borderRadius: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#060a20',
    marginVertical: 6,
    opacity: 0.5,
  },
});

export default ExpressionItem;
