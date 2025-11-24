import React, { useState, useEffect } from 'react';
import { Users, Plus, Edit2, Trash2, Save, X, Loader } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { supabase } from '../supabaseClient';

const DashboardOrganigramme = () => {
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNode, setCurrentNode] = useState(null);

  useEffect(() => {
    fetchNodes();
  }, []);

  const fetchNodes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('organigramme_nodes')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) console.error('Error fetching nodes:', error);
    else setNodes(data || []);
    setLoading(false);
  };

  const handleAdd = () => {
    setCurrentNode({ title: '', type: 'Service', parent_id: null, order_index: nodes.length + 1 });
    setIsEditing(true);
  };

  const handleEdit = (node) => {
    setCurrentNode({ ...node });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Supprimer cet élément ?')) {
      const { error } = await supabase.from('organigramme_nodes').delete().eq('id', id);
      if (!error) {
        setNodes(nodes.filter(n => n.id !== id));
      } else {
        alert("Erreur lors de la suppression");
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    try {
      if (currentNode.id) {
        // Update
        const { error } = await supabase
          .from('organigramme_nodes')
          .update({
            title: currentNode.title,
            type: currentNode.type,
            parent_id: currentNode.parent_id || null
          })
          .eq('id', currentNode.id);
          
        if (error) throw error;
        setNodes(nodes.map(n => n.id === currentNode.id ? currentNode : n));
      } else {
        // Create
        const { data, error } = await supabase
          .from('organigramme_nodes')
          .insert([{
            title: currentNode.title,
            type: currentNode.type,
            parent_id: currentNode.parent_id || null,
            order_index: currentNode.order_index
          }])
          .select();
          
        if (error) throw error;
        setNodes([...nodes, data[0]]);
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Save error:", error);
      alert("Erreur lors de l'enregistrement");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3 text-gabon-blue">
            <Users className="w-8 h-8" />
            Gestion de l'Organigramme
          </h1>
          <p className="text-neutral-gray-dark mt-1">Gérez la structure hiérarchique de la DGES</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-gabon-blue text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Ajouter un poste
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-6">
        {loading ? (
          <div className="text-center py-10"><Loader className="animate-spin w-8 h-8 mx-auto text-gabon-blue"/></div>
        ) : nodes.length === 0 ? (
            <div className="text-center py-10 text-neutral-gray-dark">Aucun élément. Commencez par en ajouter un.</div>
        ) : (
          <div className="space-y-4">
            {nodes.map((node) => (
              <div key={node.id} className="flex items-center justify-between p-4 bg-neutral-background rounded-xl border border-neutral-gray-light hover:border-gabon-blue transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    node.type === 'Direction' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                  }`}>
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-black">{node.title}</h3>
                    <p className="text-sm text-neutral-gray-dark">{node.type} {node.parent_id ? '(Sous-structure)' : '(Principal)'}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(node)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(node.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Éditer le poste</h2>
              <button onClick={() => setIsEditing(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Titre</label>
                <input
                  type="text"
                  value={currentNode.title}
                  onChange={e => setCurrentNode({...currentNode, title: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  value={currentNode.type}
                  onChange={e => setCurrentNode({...currentNode, type: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="Direction">Direction</option>
                  <option value="Service">Service</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              <div>
                 <label className="block text-sm font-medium mb-1">Parent (Optionnel)</label>
                 <select
                    value={currentNode.parent_id || ''}
                    onChange={e => setCurrentNode({...currentNode, parent_id: e.target.value || null})}
                    className="w-full p-2 border rounded-lg"
                 >
                    <option value="">Aucun (Racine)</option>
                    {nodes.filter(n => n.id !== currentNode.id).map(n => (
                        <option key={n.id} value={n.id}>{n.title}</option>
                    ))}
                 </select>
              </div>
              <button type="submit" className="w-full py-2 bg-gabon-blue text-white rounded-lg font-bold">
                Enregistrer
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};


export default DashboardOrganigramme;
