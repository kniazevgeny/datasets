export const messages = {
  ru: {
    title: 'название',
    notFound: 'Страница не найдена',
  },
  en: {
    title: 'ProDDG',
    notFound: 'Page not found',
    cookieMessage: 'We are using cookies',
    cookieButton: 'Fine👌',
    laboratoryName: 'Ivankov Lab',
    laboratorySlogan:
      'You build scientific \r breakthroughs.\rWe make them\rstand out.',
    laboratory: [
      {
        title: 'About Us',
        type: 'paragraphs',
        paragraphs: [
          'The lab is based at <a class="no-link-decoration" href="https://crei.skoltech.ru/cls" target="_blank">Center for Molecular and Cellular Biology</a> of <a class="no-link-decoration" href="http://www.skoltech.ru/en" target="_blank">Skolkovo Institute of Science and Technology</a>. Our main research areas are protein bioinformatics, physics, and evolution.',
          'One research direction of the lab is to improve prediction of protein stability change upon single mutation by combining machine learning and protein physics. Related topics are computational construction of more stable proteins and prediction of protein folding kinetics from protein three-dimensional structure. Another research direction is theoretical investigation of evolution with focus on multi-dimensional epistasis. More specifically, the lab develops computational methods and algorithms to find epistasis in experimental data and to estimate abundance of uni- and multi-dimensional epistasis in protein evolution.',
        ],
      },
      {
        title: 'Research',
        type: 'blocks',
        blocks: [
          {
            title: 'Protein Design',
            description:
              'Prediction of protein stability change upon single-point mutation by combining machine learning and protein physics. Computational construction of more stable proteins and prediction of protein folding kinetics from protein three-dimensional structure.',
            image: '',
          },
          {
            title: 'Epistasis',
            description:
              'Theoretical investigation of evolution with focus on multi-dimensional epistasis. Development of computational methods and algorithms to find epistasis in experimental data and to estimate abundance of uni- and multi-dimensional epistasis in protein evolution.',
            image: '',
          },
        ],
      },
      {
        title: 'Members',
        type: 'cards',
        cards: [
          { title: 'Dmitriy Ivankov', subtitle: 'Superviser', image: require('../assets/POE_0177.webp') },
          { title: 'Natalia Sivitskaia', subtitle: 'PhD–1', image: require('../assets/IMG_8017.webp') },
          { title: 'Marina Pak', subtitle: 'PhD–3', image: require('../assets/IMG_8597.webp') },
          { title: 'Egor Bulavko', subtitle: 'MSc–2', image: require('../assets/avatar.svg') },
          {
            title: 'Maria Carolina',
            subtitle: 'MSc–2',
            image: require('../assets/IMG_3223.webp'),
          },
          { title: 'Denis Khamitov', subtitle: 'MSc–2', image: require('../assets/IMG_2648.webp') },
        ],
      },
      {
        title: 'Publications',
        type: 'publications',
        publications: [
          {
            title:
              'Pak, M. A., & Ivankov, D. N. (2022). Best templates outperform homology models in predicting the impact of mutations on protein stability. Bioinformatics, 38(18), 4312–4320',
            description:
              'Prediction of protein stability change upon mutation (ΔΔG) is crucial for facilitating protein engineering and understanding of protein folding principles. Robust prediction of protein folding free energy change requires the knowledge of protein three-dimensional (3D) structure. In case, protein 3D structure is not available, one can predict the structure from protein sequence; however, the perspectives of ΔΔG predictions for predicted protein structures are unknown. The accuracy of using 3D structures of the best templates for the ΔΔG prediction is also unclear.\rTo investigate these questions, we used a representative set of seven diverse and accurate publicly available tools (FoldX, Eris, Rosetta, DDGun, ACDC-NN, ThermoNet and DynaMut) for stability change prediction combined with AlphaFold or I-Tasser for protein 3D structure prediction. We found that best templates perform consistently better than (or similar to) homology models for all ΔΔG predictors. Our findings imply using the best template structure for the prediction of protein stability change upon mutation if the protein 3D structure is not available.',
            url: 'https://doi.org/10.1093/bioinformatics/btac515',
          },
          {
            title:
              'Zorin, E. M., Erazo, C. M., & Ivankov, D. N. (2022). Composite mutations give an extra insight into epistasis.',
            description: '',
            url: '',
          },
          {
            title:
              'Finkelstein, A. V., Bogatyreva, N. S., Ivankov, D. N., & Garbuzynskiy, S. O. (2022). Protein folding problem: enigma, paradox, solution. Biophysical Reviews.',
            description: '',
            url: '',
          },
          {
            title:
              'Pak, M. A., Markhieva, K. A., Novikova, M. S., Petrov, D. S., Vorobyev, I. S., Maksimova, E. S., Kondrashov, F. A., & Ivankov, D. N. (2021). Using AlphaFold to predict the impact of single mutations on protein stability and function. ',
            description: '',
            url: '',
          },
          {
            title:
              'Ivankov, D. N., & Finkelstein, A. V. (2020). Solution of Levinthal’s Paradox and a Physical Theory of Protein Folding Times. Biomolecules, 10(2), 250.',
            description: '',
            url: '',
          },
          {
            title:
              'Esteban, L. A., Lonishin, L. R., Bobrovskiy, D., Leleytner, G., Bogatyreva, N. S., Kondrashov, F. A., & Ivankov, D. N. (2019). HypercubeME: two hundred million combinatorially complete datasets from a single experiment. Bioinformatics. ',
            description: '',
            url: '',
          },
          {
            title:
              'Pokusaeva, V. O., Usmanova, D. R., Putintseva, E. V., Espinar, L., Sarkisyan, K. S., Mishin, A. S., Bogatyreva, N. S., Ivankov, D. N., Akopyan, A. V., Avvakumov, S. Ya., Povolotskaya, I. S., Filion, G. J., Carey, L. B., & Kondrashov, F. A. (2019). An experimental assay of the interactions of amino acids from orthologous sequences shaping a complex fitness landscape. PLOS Genetics, 15(4), e1008079.',
            description: '',
            url: '',
          },
        ],
      },
      { title: 'Thesis Defenses', type: 'annual' },
      {
        title: 'Applications',
        type: 'blocks',
        blocks: [
          {
            title: 'Sequence number',
            image: '',
          },
          {
            title: 'Fitland',
            image: '',
          },
          {
            title: 'ΔΔG datasets and predictors',
            image: '',
          },
        ],
      },
      { title: 'Teaching', type: 'blocks' },
    ],
    mutations_headers: [
      {
        text: 'protein name',
        value: 'protein',
        description: 'Name of the protein studied in the experiment.',
        sortable: true,
        align: 'start',
      },
      {
        text: 'Mutation',
        value: 'mutation',
        description:
          'Mutation studied in the experiment. Residue numbering corresponds to that in the PDB structure. If no PDB structure is available, the residue is numbered according to the sequence specifieed in "Sequence" column.',
        align: 'start',
        sortable: true,
      },
      {
        text: 'ΔΔG',
        value: 'ddG',
        description:
          'Free energy change of folding, kcal/mol. Negative values denote stabilization.',
        sortable: true,
      },
      {
        text: 'Sequence',
        value: 'sequence',
        description: 'The sequence of the protein used in the experiment.',
        sortable: true,
      },
      {
        text: 'PDB ID',
        value: 'pdb',
        description: 'PDB ID of the protein structure if available.',
        sortable: true,
        align: 'start',
      },
      {
        text: 'chain',
        value: 'chain',
        description: 'Chain identifier of the protein structure.',
        sortable: false,
        align: 'start',
      },
      {
        text: 'uniprot',
        value: 'uniprot',
        description: 'Chain identifier of the protein structure.',
        sortable: true,
      },
      {
        text: 'AlphaFold DB',
        value: 'alphafolddb',
        description: 'Protein model in AlphaFold database.',
        sortable: true,
      },
      { text: 'organism', value: 'organism', sortable: true, align: 'start' },
      {
        text: 'Temperature',
        value: 'T',
        description: 'Temperature of the experiment in kelvins.',
        sortable: true,
      },
      {
        text: 'pH',
        value: 'pH',
        description: 'pH of the experiment.',
        sortable: true,
      },
      {
        text: 'method',
        value: 'method',
        description:
          'Method of measuring the folding free energy change in the experiment.',
        sortable: true,
      },
      {
        text: 'measure',
        value: 'measure',
        description: 'Signal measured in the experiment.',
        sortable: true,
      },
      {
        text: 'reference',
        value: 'doi',
        description: 'Experiment reference.',
        sortable: true,
      },
    ],
  },
}
