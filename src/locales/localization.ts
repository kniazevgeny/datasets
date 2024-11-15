export const messages = {
  ru: {
    title: 'ProDDG',
    notFound: 'Страница не найдена',
    laboratoryName: 'Ivankov Lab',
    laboratorySlogan:
      'Protein bioinformatics and evolution.',
  },
  en: {
    title: 'ProDDG',
    notFound: 'Page not found',
    cookieMessage: 'We are using cookies',
    cookieButton: 'Fine👌',
    errors: {
      internal: 'Internal Server Error. Try again later'
    },
    laboratoryName: 'Ivankov Lab',
    laboratorySlogan:
      'Protein bioinformatics and evolution.',
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
          {
            title: 'Dmitry Ivankov',
            subtitle: 'Superviser',
            url: 'https://faculty.skoltech.ru/people/dmitryivankov',
            image: require('../assets/POE_0177c.webp'),
          },
          {
            title: 'Natalia Sivitskaia',
            subtitle: 'PhD–1',
            url: 'https://crei.skoltech.ru/cls/people/nataliasivitskaia',
            image: require('../assets/IMG_8017c.webp'),
          },
          {
            title: 'Marina Pak',
            subtitle: 'PhD–3',
            url: 'https://crei.skoltech.ru/cls/people/marinapak',
            image: require('../assets/IMG_8597.webp'),
          },
          {
            title: 'Egor Bulavko',
            subtitle: 'MSc–2',
            url: 'https://crei.skoltech.ru/cls/people/egorbulavko',
            image: require('../assets/egor.webp'),
          },
          {
            title: 'Maria Minkevich',
            subtitle: 'MSc–2',
            url: 'https://crei.skoltech.ru/cls/people/mariaminkevich',
            image: require('../assets/IMG_3223.webp'),
          },
          {
            title: 'Denis Khamitov',
            subtitle: 'MSc–2',
            url: 'https://crei.skoltech.ru/cls/people/deniskhamitov',
            image: require('../assets/IMG_2648.webp'),
          },
          {
            title: 'Shah Zeb Khan',
            subtitle: 'MSc–2',
            url: 'https://crei.skoltech.ru/cls/people/shahzebkhan',
            image: require('../assets/IMG_20221108_235543_749s.webp'),
          },
        ],
      },
      {
        title: 'Publications',
        type: 'publications',
        publications: [
          {
            title:
              'Bulavko, E. S., & Ivankov, D. N. (2023). In silico simulations reveal molecular mechanism of uranyl ion toxicity towards DNA-binding domain of PARP-1 protein.',
            description:
              'The molecular toxicity of uranyl ion (UO22+) in living cells is mainly conditioned by its high affinity to both native and potential metal-binding sites frequently occurring in biomolecules structure. Recent advances in computational and experimental research shed light on the structural properties and functional impacts of uranyl binding to proteins, organic ligands, nucleic acids and their complexes. In the present work, we report the results of the theoretical investigation of the uranyl-mediated loss of DNA-binding activity of PARP-1, eukaryotic enzyme that participates in DNA reparation, cell differentiation, induction of inflammation, etc. Latest experimental studies showed that uranyl ion directly interacts with its DNA-binding subdomains - zinc fingers Zn1 and Zn2, - and changes their tertiary structure. Here, we propose an atomistic mechanism underlying this process and compute the free energy change along the suggested pathway to prove its relevance. According to the results of our QM/MM simulations of Zn2-UO22+ complex, uranyl ion replaces zinc in its native binding site, but the corresponding state is destroyed because of the following spontaneous internal hydrolysis of the U-Cys162 coordination bond. Although the enthalpy of hydrolysis is +2.8 kcal/mol, the final value of the free energy of the reaction constitutes -0.6 kcal/mol, due to structure loosening evidenced by solvation and configuration thermodynamic properties calculated using GIST- and MIST-based trajectory processing techniques. The subsequent reorganization of the binding site includes association of uranyl ion with the Glu190/Asp191 acidic cluster and significant perturbations in the domain\'s tertiary structure, which further decreases the free energy of the non-functional state by 6.8 kcal/mol. The disruption of the DNA-binding interface revealed in our computational simulations is consistent with previous experimental findings and appears to be associated with the loss of the Zn2 affinity for nucleic acids.',
            url: 'https://doi.org/10.1101/2023.06.02.543417',
          },
          {
            title:
              'Weinstein, J. Y., Martí-Gómez, C., Lipsh-Sokolik, R., Hoch, S. Y., Liebermann, D., Nevo, R., Weissman, H., Petrovich-Kopitman, E., Margulies, D., Ivankov, D., McCandlish, D. M., & Fleishman, S. J. (2023). Designed active-site library reveals thousands of functional GFP variants. Nature Communications, 14(1).',
            description:
              'Mutations in a protein active site can lead to dramatic and useful changes in protein activity. The active site, however, is sensitive to mutations due to a high density of molecular interactions, substantially reducing the likelihood of obtaining functional multipoint mutants. We introduce an atomistic and machine-learning-based approach, called high-throughput Functional Libraries (htFuncLib), that designs a sequence space in which mutations form low-energy combinations that mitigate the risk of incompatible interactions. We apply htFuncLib to the GFP chromophore-binding pocket, and, using fluorescence readout, recover >16,000 unique designs encoding as many as eight active-site mutations. Many designs exhibit substantial and useful diversity in functional thermostability (up to 96 °C), fluorescence lifetime, and quantum yield. By eliminating incompatible active-site mutations, htFuncLib generates a large diversity of functional sequences. We envision that htFuncLib will be used in one-shot optimization of activity in enzymes, binders, and other proteins.',
            url: 'https://doi.org/10.1038/s41467-023-38099-z',
          },
          {
            title:
              'Egorova, T. V., Galkin, I. I., Velyaev, O. A., Vassilieva, S. G., Savchenko, I. M., Loginov, V. A., Dzhenkova, M. A., Korshunova, D. S., Kozlova, O. S., Ivankov, D. N., & Polikarpova, A. V. (2023). In-Frame Deletion of Dystrophin Exons 8–50 Results in DMD Phenotype. International Journal of Molecular Sciences, 24(11), 9117.',
            description:
              'Mutations that prevent the production of proteins in the DMD gene cause Duchenne muscular dystrophy. Most frequently, these are deletions leading to reading-frame shift. The “reading-frame rule” states that deletions that preserve ORF result in a milder Becker muscular dystrophy. By removing several exons, new genome editing tools enable reading-frame restoration in DMD with the production of BMD-like dystrophins. However, not every truncated dystrophin with a significant internal loss functions properly. To determine the effectiveness of potential genome editing, each variant should be carefully studied in vitro or in vivo. In this study, we focused on the deletion of exons 8–50 as a potential reading-frame restoration option. Using the CRISPR-Cas9 tool, we created the novel mouse model DMDdel8-50, which has an in-frame deletion in the DMD gene. We compared DMDdel8-50 mice to C57Bl6/CBA background control mice and previously generated DMDdel8-34 KO mice. We discovered that the shortened protein was expressed and correctly localized on the sarcolemma. The truncated protein, on the other hand, was unable to function like a full-length dystrophin and prevent disease progression. On the basis of protein expression, histological examination, and physical assessment of the mice, we concluded that the deletion of exons 8–50 is an exception to the reading-frame rule.',
            url: 'https://doi.org/10.3390/ijms24119117',
          },
          {
            title:
              'Pak, M. A., Markhieva, K. A., Novikova, M. S., Petrov, D. S., Vorobyev, I. S., Maksimova, E. S., Kondrashov, F. A., & Ivankov, D. N. (2023). Using AlphaFold to predict the impact of single mutations on protein stability and function. PLOS ONE, 18(3), e0282689.',
            description:
              'AlphaFold changed the field of structural biology by achieving three-dimensional (3D) structure prediction from protein sequence at experimental quality. The astounding success even led to claims that the protein folding problem is “solved”. However, protein folding problem is more than just structure prediction from sequence. Presently, it is unknown if the AlphaFold-triggered revolution could help to solve other problems related to protein folding. Here we assay the ability of AlphaFold to predict the impact of single mutations on protein stability (ΔΔG) and function. To study the question we extracted metrics from AlphaFold predictions before and after single mutation in a protein and correlated the predicted change with the experimentally known ΔΔG values. Additionally, we correlated the AlphaFold predictions on the impact of a single mutation on structure with a large scale dataset of single mutations in GFP with the experimentally assayed levels of fluorescence. We found a very weak or no correlation between AlphaFold output metrics and change of protein stability or fluorescence. Our results imply that AlphaFold cannot be immediately applied to other problems or applications in protein folding.',
            url: 'https://doi.org/10.1371/journal.pone.0282689',
          },
          {
            title:
              'Pak, M. A., Dovidchenko, N. V., Sharma, S. M., & Ivankov, D. N. (2023). New mega dataset combined with deep neural network makes a progress in predicting impact of mutation on protein stability.',
            description:
              'Prediction of proteins stability change (ΔΔG) due to single mutation is important for biotechnology, medicine, and our understanding of physics underlying protein folding. Despite the recent tremendous success in 3D protein structure prediction, the apparently simpler problem of predicting the effect of mutations on protein stability has been hampered by the low amount of experimental data. With the recent high-throughput measurements of mutational effects in ‘mega’ experiment for ~850,000 mutations [Tsuboyama et al., bioRxiv, 2022] it becomes possible to apply the state-of-the-art deep learning methods. Here we explore the ability of ESM2 deep neural network architecture with added Light Attention mechanism to predict the change of protein stability due to single mutations. The resulting method ABYSSAL predicts well the data from the ‘mega’ experiment (Pearson correlation 0.85) while the prediction of ΔΔG values from previous experiments is more modest (Pearson correlation 0.50). ABYSSAL also shows a perfect satisfaction of the antisymmetry property. The ABYSSAL training demonstrated that the dataset should contain around ~100,000 data points for taking advantage of the state-of-the-art deep learning methods. Overall, our study shows great perspectives for developing the deep learning ΔΔG predictors..',
            url: 'https://doi.org/10.1101/2022.12.31.522396',
          },
          {
            title:
              'Finkelstein, A. V., Bogatyreva, N. S., Ivankov, D. N., & Garbuzynskiy, S. O. (2022). Protein folding problem: enigma, paradox, solution. Biophysical Reviews.',
            description:
              'The ability of protein chains to spontaneously form their three-dimensional structures is a long-standing mystery in molecular biology. The most conceptual aspect of this mystery is how the protein chain can find its native, “working” spatial structure (which, for not too big protein chains, corresponds to the global free energy minimum) in a biologically reasonable time, without exhaustive enumeration of all possible conformations, which would take billions of years. This is the so-called “Levinthal’s paradox.” In this review, we discuss the key ideas and discoveries leading to the current understanding of protein folding kinetics, including folding landscapes and funnels, free energy barriers at the folding/unfolding pathways, and the solution of Levinthal’s paradox. A special role here is played by the “all-or-none” phase transition occurring at protein folding and unfolding and by the point of thermodynamic (and kinetic) equilibrium between the “native” and the “unfolded” phases of the protein chain (where the theory obtains the simplest form). The modern theory provides an understanding of key features of protein folding and, in good agreement with experiments, it (i) outlines the chain length-dependent range of protein folding times, (ii) predicts the observed maximal size of “foldable” proteins and domains. Besides, it predicts the maximal size of proteins and domains that fold under solely thermodynamic (rather than kinetic) control. Complementarily, a theoretical analysis of the number of possible protein folding patterns, performed at the level of formation and assembly of secondary structures, correctly outlines the upper limit of protein folding times.',
            url: 'https://doi.org/10.1007/s12551-022-01000-1',
          },
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
            description:
              'The intricate genotype-phenotype relationship has been a long-standing issue in biology, important both from the fundamental and applied points of view. One of the major irregularities hindering progress in establishing these links is epistasis – the complex and elusive interaction between mutations. Despite the vast accumulated genetic data and progress in this area, epistasis is still far from being completely understood. Epistasis can be studied quantitatively in combinatorially complete datasets, which form hypercubes in protein sequence space, where connected sequences are one mutation away from each other. However, this might be insufficient to portray the full picture of epistatic interactions. To extend the repertoire of the methods for exploring epistasis, we propose here to consider hyperrectangles, where some edges connect sequences being two or more mutations away from each other. The present work formalizes the theoretical knowledge about these novel structures and compares the amount of epistasis identified in hypercubes and hyperrectangles constructed from experimental datasets. A new algorithm, CuboidME, was developed for calculating hyperrectangles, which were then compared to hypercubes. In the experimental datasets, there were four orders of magnitude more hyperrectangles than hypercubes for the same sample size. Subsequently, we showed that for the studied datasets there is an increase in epistasis measured by epistatic coefficients in hyperrectangles compared to hypercubes. For the same datasets, hyperrectangles could find more sign epistasis than using hypercubes alone. We also show that there is a trend for increase in epistasis with increasing number of mutations being considered in a hyperrectangle. The results indicate that hyperrectangles can be used to reveal more information on epistasis in a fitness landscape, especially if it is combinatorially incomplete.',
            url: 'https://doi.org/10.1101/2022.06.16.496391',
          },
          {
            title:
              'Ivankov, D. N., & Finkelstein, A. V. (2020). Solution of Levinthal’s Paradox and a Physical Theory of Protein Folding Times. Biomolecules, 10(2), 250.',
            description:
              '“How do proteins fold?” Researchers have been studying different aspects of this question for more than 50 years. The most conceptual aspect of the problem is how protein can find the global free energy minimum in a biologically reasonable time, without exhaustive enumeration of all possible conformations, the so-called “Levinthal’s paradox.” Less conceptual but still critical are aspects about factors defining folding times of particular proteins and about perspectives of machine learning for their prediction. We will discuss in this review the key ideas and discoveries leading to the current understanding of folding kinetics, including the solution of Levinthal’s paradox, as well as the current state of the art in the prediction of protein folding times.',
            url: 'https://doi.org/10.3390/biom10020250',
          },
          {
            title:
              'Esteban, L. A., Lonishin, L. R., Bobrovskiy, D., Leleytner, G., Bogatyreva, N. S., Kondrashov, F. A., & Ivankov, D. N. (2019). HypercubeME: two hundred million combinatorially complete datasets from a single experiment. Bioinformatics. ',
            description:
              'Motivation\rEpistasis, the context-dependence of the contribution of an amino acid substitution to fitness, is common in evolution. To detect epistasis, fitness must be measured for at least four genotypes: the reference genotype, two different single mutants and a double mutant with both of the single mutations. For higher-order epistasis of the order n, fitness has to be measured for all 2n genotypes of an n-dimensional hypercube in genotype space forming a ‘combinatorially complete dataset’. So far, only a handful of such datasets have been produced by manual curation. Concurrently, random mutagenesis experiments have produced measurements of fitness and other phenotypes in a high-throughput manner, potentially containing a number of combinatorially complete datasets.\rResults\rWe present an effective recursive algorithm for finding all hypercube structures in random mutagenesis experimental data. To test the algorithm, we applied it to the data from a recent HIS3 protein dataset and found all 199 847 053 unique combinatorially complete genotype combinations of dimensionality ranging from 2 to 12. The algorithm may be useful for researchers looking for higher-order epistasis in their high-throughput experimental data.',
            url: 'https://doi.org/10.1093/bioinformatics/btz841',
          },
          {
            title:
              'Pokusaeva, V. O., Usmanova, D. R., Putintseva, E. V., Espinar, L., Sarkisyan, K. S., Mishin, A. S., Bogatyreva, N. S., Ivankov, D. N., Akopyan, A. V., Avvakumov, S. Ya., Povolotskaya, I. S., Filion, G. J., Carey, L. B., & Kondrashov, F. A. (2019). An experimental assay of the interactions of amino acids from orthologous sequences shaping a complex fitness landscape. PLOS Genetics, 15(4), e1008079.',
            description:
              'Characterizing the fitness landscape, a representation of fitness for a large set of genotypes, is key to understanding how genetic information is interpreted to create functional organisms. Here we determined the evolutionarily-relevant segment of the fitness landscape of His3, a gene coding for an enzyme in the histidine synthesis pathway, focusing on combinations of amino acid states found at orthologous sites of extant species. Just 15% of amino acids found in yeast His3 orthologues were always neutral while the impact on fitness of the remaining 85% depended on the genetic background. Furthermore, at 67% of sites, amino acid replacements were under sign epistasis, having both strongly positive and negative effect in different genetic backgrounds. 46% of sites were under reciprocal sign epistasis. The fitness impact of amino acid replacements was influenced by only a few genetic backgrounds but involved interaction of multiple sites, shaping a rugged fitness landscape in which many of the shortest paths between highly fit genotypes are inaccessible.',
            url: 'https://doi.org/10.1371/journal.pgen.1008079',
          },
        ],
      },
      {
        title: 'Thesis Defenses',
        type: 'annual',
        data: [
          {
            title: 'Evgenii Zorin, MSc',
            description: 'Investigation of epistasis using composite mutations',
            year: 2022,
          },
          {
            title: 'Carolina Erazo, MSc',
            description:
              'Analysis of epistasis in combinatorially complete datasets with focus on evolutionary models',
            year: 2022,
          },
          {
            title: 'Natalia Sivitskaia, MSc',
            description:
              'Search for amino acid substitutions stabilizing human ribonuclease inhibitor',
            year: 2021,
          },
          {
            title: 'Marina Pak, MSc',
            description:
              'Study of influence of homology modeling on the prediction of protein stability change upon mutation',
            year: 2020,
          },
        ],
      },
      {
        title: 'Applications',
        type: 'blocks',
        blocks: [
          // {
          //   title: 'Sequence number',
          //   image: '',
          // },
          // {
          //   title: 'Fitland',
          //   image: '',
          // },
          {
            title: 'ProDDG',
            description: '',
            url: 'proddg',
            image: require('../assets/proddg-light.webp'),
          },
          {
            title: 'Mega assessment of ΔΔG predictors',
            description: '',
            url: 'https://ivankovlab.ru/megaddg_plots.html',
            image: require('../assets/newplot.webp'),
          },

        ],
      },
      { 
        title: 'Teaching', 
        type: 'publications',
        publications: [
          {
            title: '<a target="_blank" href="https://files.skoltech.ru/data/edu/syllabuses/2020/MA030372.pdf?v=166oul">Introduction to Programming for Biologists</a>',
            removeSpoiler: true
          },
          {
            title: '<a target="_blank" href="https://files.skoltech.ru/data/edu/syllabuses/2020/MA060375.pdf?v=eo8ldx">Structural Bioinformatics</a>',
            removeSpoiler: true
          },
        ],
       },
    ],
    proddgLanding: [
      {
        title: 'ProDDG',
        type: 'paragraphs',
        paragraphs: [
          'ProDDG is a web-service for developers, assessors and users of tools for predicting the effect of protein mutations. ProDDG provides all datasets on protein stability changes upon mutations (∆∆G) that were used for training, testing, and assessment of popular ∆∆G predictors.',
          'ProDDG allows you to access and analyze ∆∆G data, compile leakage-free datasets for evaluating predictors, and discover the latest and most accurate ∆∆G predictors.',
        ],
        button: {
          text: 'Learn more about service',
          to: 'proddg/about'
        }
      },
      {
        title: 'Features',
        type: 'blocks',
        blocks: [
          {
            title: '∆∆G data for training and testing',
            description:
              'Browse all ∆∆G data and filter mutations to develop your tool, or download popular training and testing sets.',
            url: 'proddg/browse',
            image: require('../assets/01_1bni.webp'),
            noimage: false,
          },
          {
            title: '∆∆G data for assessment',
            description:
            'Download popular validation datasets or compile your own. Use our utility to exclude data leakage in your dataset for unbiased assessment.',
            url: 'proddg/datasets',
            image: require('../assets/02_datasets.webp'),
            noimage: false,
          },
          {
            title: 'Find ∆∆G predictors ',
            description:
            'Check online and standalone ∆∆G predictors by algorithm, authors, antisymmetry and other specifications. ',
            url: 'proddg/predictors',
            image: require('../assets/03_predictors.webp'),
            noimage: false,
          },
        ],
      },
      {
        title: 'Cite us',
        type: 'paragraphs',
        paragraphs: [
          'If you used ProDDG in your work, please, cite us:',
          'Marina A. Pak, Evgeny V. Kniazev, Igor D. Abramkin, Dmitry N. Ivankov. (2023). ProDDG - database of ∆∆G datasets and predictors. Available at: https://ivankovlab.ru/proddg. ',
        ],
      },
      {
        title: 'Share your feedback',
        type: 'paragraphs',
        paragraphs: [
          'If you\'ve found a mistake, want to share your experience or suggest ideas for service improvement, don\'t hesitate to write to <a href="mailto:marina.pak@skoltech.ru">marina.pak@skoltech.ru</a>.',
        ],
      },
    ],
    proddgAbout: [
      {
        title: 'About ProDDG',
        type: 'paragraphs',
        paragraphs: []
      },
      {
        title: 'What can I do with ProDDG?',
        type: 'paragraphs',
        paragraphs: [
          'The aim of ProDDG is to provide ΔΔG datasets for development and assessment of tools for mutation effect prediction and to aggregate the list of popular ΔΔG predictors. ΔΔG datasets from original studies were checked for errors in mutation position in the sequence and the PDB structure and supplied with data on studied protein, wild-type and mutated sequence (see more details below). Thus, ProDDG provides ready-to-use ΔΔG datasets. ',
          '<br><h5 class="sf section-title">01: Search, filter and download ΔΔG data</h5>',
          'Looking for ΔΔG data? Check out more than 600K mutations in more than 800 proteins in <a href="browse">Browse mutations</a>. Apply filters to data in the Filters sidebar and use the search field. Download data through Manage filtered button.',
          {
            title: 'Download destabilizing mutations in P04637 (p53).',
            type: 'video',
            video: require('@/assets/explainers/01_720.mp4'),
            autoplay: false
          },
          '<br><h5 class="sf section-title">02: Download ΔΔG datasets</h5>',
          'In <a href="datasets">Datasets</a> you can download popular ΔΔG dataset for training, such as <a href="dataset/PoPMuSiC-S2648">S2648</a>, or assessment, such as <a href="dataset/Myoglobin">Myoglobin</a>, <a href="dataset/Ssym">Ssym</a>, <a href="dataset/p53">p53</a>, <a href="dataset/S669">S669</a>. ProDDG also features <a href="dataset/MegaDataset">Mega dataset</a> of 584 755 mutations, the largest dataset of ΔΔG data so far.',
          {
            title: 'Download popular training set S2648 (Dehouck et al., 2009).',
            type: 'video',
            video: require('@/assets/explainers/02_720.mp4'),
            autoplay: true
          },
          '<br><h5 class="sf section-title">03: Manage homology reduction between datasets</h5>',
          'For unbiased assessment of predictor’s performance it is crucial to ensure that testing data is dissimilar to the data used for predictor training. You can do that using the utility in ProDDG for finding overlapping data between two datasets at the given threshold of protein sequence identity identified by protein BLAST. To access the utility, select two datasets in the <a href="datasets">Datasets</a> tab. It outputs mutations in proteins from the second dataset that are similar to the proteins from the first dataset at most by the specified sequence identity cutoff.',
          {
            title: 'Remove mutations in proteins from S669 dataset that are similar to proteins in S2648 by more than 30% of sequence identity. Filtered dataset can be used for unbiased assessment of predictors trained on S2648.',
            type: 'video',
            video: require('@/assets/explainers/03_720.mp4'),
            autoplay: true
          },
          '<br><h5 class="sf section-title">04: Find ΔΔG predictors</h5>',
          'Check out the most popular <a href="predictors">ΔΔG predictors</a>. Select the predictor based on the type of input data, algorithm, availability as a web-server or standalone, authors, year, development features, and other parameters. All predictors are cross-linked with the datasets used for their training and testing which is very helpful for independent assessment of predictors.',
          {
            title: 'Find new structure-based standalone ΔΔG predictors.',
            type: 'video',
            video: require('@/assets/explainers/04_720.mp4'),
            autoplay: true
          },
        ]
      },
      {
        title: 'What ProDDG is not?',
        type: 'paragraphs',
        paragraphs: [
          'ProDDG does not aim to create a database of curated and validated ΔΔG data. We did not verify the ΔΔG data with the original source of the experiment. Unfortunately, most of the datasets do not have references to the source experiments anyway. Thus, it is a user\'s choice to trust or not to trust the ΔΔG value in a dataset. ',
        ]
      },
      {
        title: 'Description of the datasets in ProDDG',
        type: 'paragraphs',
        paragraphs: [
          'All ΔΔG datasets in ProDDG were processed to have a unified format.🔗',
          'ΔΔG values are the folding free energy change of folding (negative values denote stabilization). ',
          'All datasets obligatorily contain the following data: PDB, Chain, Protein, Gene, Uniprot ID, Uniprot, Organism, Mutation, ΔΔG, Wild-type sequence, Mutant sequence. Wild-type sequence is always provided, there is not a single entry without it, while other protein data may be absent (e.g. if there is no experimental structure available, PDB and Chain will be missing or if the protein is designed de novo, there will be no Uniprot data). If not provided in the original dataset, the wild-type sequence was retrieved from the SEQRES record of PDB structure. Additionally, some datasets may contain information about mutant structures, experimental conditions (pH, T), references, notes, and other information specific to the given dataset. Notes contain comments that were provided with the original dataset. If the entry in the original dataset contains erroneous data it will be stated in the Notes.',
          'Mutations have a standard format: < original amino acid >< position >< new amino acid >. Position numbering matches that in the wild-type sequence. If applicable, Mutation PDB is provided with the numbering corresponding to the stated PDB structure.',
          'More technical details on all columns in the datasets, their description, and how data was retrieved is provided on <a href="https://github.com/ivankovlab/proddg">github</a>.',
        ]
      },
    ],
    mutations_headers: [
      {
        text: 'protein',
        value: 'protein',
        description: 'Name of the protein studied in the experiment.',
        sortable: true,
        align: 'start',
      },
      {
        text: 'Mutation (PDB)',
        value: 'mutation_pdb',
        description:
          'Mutation studied in the experiment. Residue numbering corresponds to that in the PDB structure.',
        align: 'start',
        sortable: true,
      },
      {
        text: 'Mutation',
        value: 'mutation',
        description:
          'Mutation studied in the experiment. Residue numbering corresponds to that in the sequence.',
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
        text: 'PDB',
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
        description: 'UNIPROT accession number.',
        sortable: true,
      },
      {
        text: 'AlphaFold DB',
        value: 'alphafolddb',
        description: 'Protein model in AlphaFold database.',
        sortable: true,
      },
      { text: 'organism', value: 'organism', sortable: true, align: 'start' },
      { text: 'Uniprot ID', value: 'uniprot_id', sortable: true, align: 'start' },
      { text: 'gene', value: 'gene', sortable: true, align: 'start' },
    ],
    rowsToCompareInDatasets: [
      'size',
      'mutations',
      'proteins',
      'year'
    ]
  },
}
