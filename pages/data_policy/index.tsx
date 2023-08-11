import { NextPage } from "next"
import { Layout } from "../../components/layouts"
import styles from './policies.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const PoliciesPage: NextPage = () => {
    return(
        <Layout title="Data Policy">
            <div className={styles['policies-container']}>
                <h2 className={styles['policies-title']}>Política de Manejo</h2>
                <div className={styles['policies-body']}>
                    <div className={styles['justify-text']}>
                        La política de manejo de datos para el Observatorio del Arroz para América Latina es un acuerdo entre el Fondo Latinoamericano para Arroz de Riego – FLAR, cuyos miembros activos se denominan en esta Política como Proveedores o Proveedor y el Centro Internacional de Agricultura Tropical (CIAT), parte de la Alianza Bioversity International CIAT desde Enero 1 de 2020, quien en la parte operativa está representado por la Unidad de Prospectivas, Economía Aplicada e Impacto y quien en este Documento funge como Receptor.
                    </div>
                    <div className={styles['justify-text']}>
                        Los miembros del <b>FLAR</b>, como parte <b>Proveedora</b>, son los titulares y dueños de la información relacionada al cultivo del arroz, o tienen el control sobre dicha información, en adelante los <b>Datos</b> recopilados mediante la Encuesta de Monitoreo y Seguimiento al Sector AEMSAL y aprueban que dichos Datos sean tratados de acuerdo con esta Política. El CIAT, miembro de la Alianza, como Receptor cuenta con la Unidad de Prospectivas, Economía Aplicada e Impacto, que tienen las capacidades técnicas y científicas para el procesamiento, almacenamiento, resguardo y análisis de datos. Como tal, acepta que dichas actividades con los Datos, al igual que la divulgación o comunicación de los mismos, se lleven a cabo según los términos de esta Política.    
                    </div>
                    <div className={styles['justify-text']}>
                        Por lo tanto, el <b>FLAR</b> y el <b>CIAT</b>, como parte de la Alianza, como las Partes firmantes de la presente Política, adoptan de mutuo acuerdo los siguientes términos para el manejo de datos para el Observatorio del Arroz:
                    </div>
                    <div className={styles['justify-text']}> 
                        <ol type="1">
                            <li className={styles['list-element']}><b>Definiciones</b></li>
                                Para una mejor interpretación de la Política las Partes han adoptado los siguientes términos:
                            <ol type="a">
                                <li className={styles['list-element']}><b>Autor: </b>La persona física (natural) que realiza la creación intelectual de carácter literario o artístico o técnico-científico.</li>
                                <li className={styles['list-element']}><b>Base de datos: </b>Conjunto organizado de, o repositorio de Datos, o conjuntos de Datos de índole científicos, administrativos socio-económicos, estadísticos y de cualquier otro que son objeto de análisis y tratamiento, están indexados y cuyo contenido se puede acceder, analizar y manejar.</li>
                                <li className={styles['list-element']}><b>Dato(s): </b>Incluye dos categorías: (i) Datos Crudos, que incluyen números, caracteres, valores de variables cualitativas y cuantitativas relacionadas con un ítem, los cuales son directamente generados o capturados durante actividades de investigación, de desarrollo, financieras, laborales, socio-económicas, o de cualquier índole, y a través de cualquier medio; (ii) Datos Procesados, que incluyen Datos agregados, interpretados, comentados o de cualquier forma analizados, mantenidos o almacenados en cualquier formato. Datos Procesados se consideran también Información, ya que adquieren un significado.</li>
                                <li className={styles['list-element']}><b>Datos Personales: </b>Son aquellos Datos que permiten la identificación de una persona o un grupo de personas.</li>
                                <li className={styles['list-element']}><b>Datos Confidenciales: </b>Son aquellos Datos de cualquier índole que no son públicos ya sea por su naturaleza, por decisión de la Parte reveladora, incluido cada uno de los Proveedores, o por decisión mutua de las Partes, requieren un trato especial o condicionado a unas características de manejo para su revelación, no pudiendo ser distribuidos o compartidos o comunicados a terceros, ni aquellos que no estén directamente autorizados para su Tratamiento. Dichos Datos pueden corresponder a Datos Personales protegidos por leyes de privacidad operando en múltiples países y pueden incorporar Datos sensibles. En todos los casos Datos Sensibles son Datos Confidenciales. Sin embargo, no todos los Datos Confidenciales son Sensibles. Datos Sensibles son datos personales que revelan origen racial y étnico, opiniones políticas, convicciones religiosas, filosóficas o morales, afiliación sindical e información referente a la salud o a la vida sexual.</li>
                                <li className={styles['list-element']}><b>Derechos Morales: </b>Son los que tienen los autores de una obra y que son de carácter perpetuo, irrenunciables e inalienables. Derechos patrimoniales. Son los derechos reconocidos por el Estado al dueño de los derechos de propiedad intelectual. En relación a derechos de autor, dichos derechos comprenden la facultad exclusiva de realizar, autorizar o prohibir, actos tales como: reproducción, comunicación pública, traducción, adaptación, arreglo o cualquier otra modificación, distribución publica de ejemplares, importación de copias ilegales, o cualquier clase de explotación de la obra por cualquier medio conocido o por conocerse.</li>
                                <li className={styles['list-element']}><b>Encargado del Tratamiento: </b>Persona natural o jurídica, pública o privada, que por sí misma o en asociación con otros, realice el Tratamiento de los Datos entregados por parte del Responsable del Tratamiento y lo haga por encargo de este último.</li>
                                <li className={styles['list-element']}><b>Responsable de Tratamiento: </b>Persona natural o jurídica, pública o privada, que por sí misma o en asocio con otros, decide sobre la Base de Datos y/o el tratamiento de los Datos.</li>
                                <li className={styles['list-element']}><b>Derecho de Autor: </b>Derechos de propiedad intelectual aplicables a obras o productos literarios o artísticos que existen automáticamente a partir del momento de creación o la primera exposición pública de dicha obra, de duración determinada y que son ostentados por el autor y reconocidos por el Estado a dicho creador.</li>
                                <li className={styles['list-element']}><b>Titular: </b>Persona natural o jurídica, pública o privada propietaria de los Datos.</li>
                                <li className={styles['list-element']}><b>Tratamiento: </b>Cualquier operación o conjunto de operaciones sobre o con los Datos incluyendo la recolección, almacenamiento, uso, procesamiento, circulación o supresión.</li>
                            </ol>
                            <li className={styles['list-element']}><b>Responsabilidades de Proveedor</b></li>
                            <ol type="a">
                                <li className={styles['list-element']}>El Proveedor certifica que es el Titular de los Datos o que tiene el control sobre los Datos a entregar o transferir al Receptor. El Proveedor es y seguirá siendo el Titular de los datos, según aplique, y ningún Tratamiento de dichos Datos alterará este hecho.</li>
                                <li className={styles['list-element']}>El Proveedor certifica que entrega o transfiere los Datos libremente al Receptor y que tiene el derecho de y está autorizado a realizar dicha transferencia de Datos al Receptor.</li>
                                <li className={styles['list-element']}>El Proveedor tiene el derecho de definir si los Datos a transferir al Receptor son o no de acceso al público.</li>
                                <li className={styles['list-element']}>El Proveedor informará sobre la naturaleza de los Datos al Receptor, diciendo y marcando explícitamente si son Datos Personales y Sensibles y/o Confidenciales. El Receptor otorgará una lista de las variables recolectadas en la EMSAL para que el Proveedor defina los datos que serán de acceso al público y su naturaleza.</li>
                                <li className={styles['list-element']}>En caso de transferir Datos Personales o Datos Sensibles, el Proveedor certificará que ha adquirido la autorización previa correspondiente por parte del Titular de los Datos para el Tratamiento de los mismos por parte del Receptor para los propósitos del Observatorio de Arroz. El Proveedor llevará un registro de dichas autorizaciones previas y estará en capacidad de suministrar prueba de dichas autorizaciones, en caso de ser solicitadas por el Receptor.</li>
                                <li className={styles['list-element']}>El Proveedor se compromete al llenado de la Encuesta de Monitoreo y Seguimiento al Sector Arrocero de Latinoamérica – EMSAL al menos una vez por año para la actualización y verificación de los datos.</li>
                                <li className={styles['list-element']}>El Proveedor proveerá los Datos necesarios y acordados con el Receptor de la manera más completa, actualizada y precisa posible para que el Receptor lleve a cabo los análisis y estudios contemplados en esta Política, incluyendo información adicional o complementaria cuando sea necesario.</li>
                                <li className={styles['list-element']}>El Proveedor fungirá el papel de Responsable del Tratamiento en la medida en que junto con el Receptor decida y apruebe el Tratamiento que se dé a los Datos entregados al Receptor.</li>
                                <li className={styles['list-element']}>El Proveedor otorga al Receptor el derecho de usar los Datos de manera no exclusiva, a nivel mundial, libre de regalías, de acuerdo con los términos de esta Política.</li>
                            </ol>
                            <li className={styles['list-element']}><b>Responsabilidades de Proveedor</b></li>
                        </ol>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default PoliciesPage