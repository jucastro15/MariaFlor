import './adicionar-unidade.scss';
import Cabecalho from '../../components/cabecalho/cabecalho.jsx';
import Rodape from '../../components/rodape/rodape.jsx';
import Aviso from '../../components/aviso/aviso.jsx';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddUnidade() {
  const [imagem, setImagem] = useState(null);
  const [endereco, setEndereco] = useState('');
  const [abre, setAbre] = useState('');
  const [fecha, setFecha] = useState('');
  const [url_maps, setUrl_maps] = useState('');

  const inputFileRef = useRef(null);
  const pictureImageRef = useRef(null);
  const pictureImageTxt = "Buscar imagem no dispositivo";

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagem(reader.result); 
      };
      reader.readAsDataURL(file);
    } else {
      setImagem(null);
    }
  };

  async function salvar() {
    const formData = new FormData();
    
    // Adiciona a imagem e os demais campos ao FormData
    formData.append('foto', inputFileRef.current.files[0]); // envia o arquivo diretamente
    formData.append('endereco', endereco);
    formData.append('abre', abre);
    formData.append('fecha', fecha);
    formData.append('url_maps', url_maps);
  
    const url = 'http://localhost:7000/unidade';
  
    try {
      await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setmensagemAviso('Unidade adicionada com sucesso!');
      setAvisoTipo('success');
      setTimeout(() => navigate("/unidades"), 3000);
    } catch (error) {
      setmensagemAviso('Erro ao adicionar unidade');
      setAvisoTipo('error');
    }
  }
  

  const [mensagemAviso, setmensagemAviso] = useState('');
  const [AvisoTipo, setAvisoTipo] = useState('');
  const FecharAviso = () => {
    setmensagemAviso('');
  };

  useEffect(() => {
    pictureImageRef.current.innerHTML = pictureImageTxt;
  }, []);

  return (
    <div className="add-uni">
      <Aviso
        message={mensagemAviso}
        onClose={FecharAviso}
        duration={3000}
        type={AvisoTipo}
      />
      <header className="cabecalho">
        <Cabecalho />
      </header>

      <div className="resto">
        <div className="barra">
          <h1>Adicionar Unidades Maria Flor</h1>
        </div>

        <div className="adicionar">
          <div className="imagem">
            <label className="picture" htmlFor="picture__input" tabIndex="0">
              <span className="picture__image" ref={pictureImageRef}></span>
            </label>
            <input
              type="file"
              accept="image/*"
              name="picture__input"
              id="picture__input"
              ref={inputFileRef}
              onChange={handleFileChange} //vixx
            />
            {imagem && (
              <div className="imagem-preview">
                <img src={imagem} alt="Pré-visualização" className="picture__img" />
              </div>
            )}
          </div>

          <div className="interativo">
            <div className="inputs">
              <div className="endereco">
                <img src="./images/localizacao.png" alt="" width={20} />
                <input
                  type="text"
                  placeholder="Insira o endereço do estabelecimento"
                  value={endereco}
                  onChange={e => setEndereco(e.target.value)}
                />
              </div>

              <div className="funcionamento">
                <img src="./images/relogio.png" alt="" width={17} />
                <p>Horário de Funcionamento:</p>
                <input
                  type="time"
                  value={abre}
                  onChange={e => setAbre(e.target.value)}
                />
                <p>às</p>
                <input
                  type="time"
                  value={fecha}
                  onChange={e => setFecha(e.target.value)}
                />
              </div>
            </div>

            <div className="baixo">
              <div className="maps">
                <img src="./images/maps.png" alt="" width={20} />
                <input
                  type="url"
                  placeholder="URL da Localização da Empresa no Google Maps"
                  value={url_maps}
                  onChange={e => setUrl_maps(e.target.value)}
                />
              </div>

              <button onClick={salvar}>Adicionar</button>
            </div>
          </div>
        </div>
      </div>

      <div className="rodape">
        <Rodape />
      </div>
    </div>
  );
}
