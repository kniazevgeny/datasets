export const messages = {
  ru: {
    title: 'название',
    notFound: 'Страница не найдена',
  },
  en: {
    title: 'title',
    notFound: 'Page not found',
    cookieMessage: 'We are using cookies',
    cookieButton: 'Fine👌',
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
