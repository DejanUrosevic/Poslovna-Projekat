package web.poslovna.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.sql.SQLException;
import java.util.List;

import javax.xml.datatype.DatatypeConfigurationException;

/**
 * CRUD (Create/Read/Update/Delete) service.
 * 
 * @param <T>
 */
public interface CrudService<T> {

	/**
	 * Find and return entity with passed id.
	 * 
	 * @param id
	 *            of the entity to return
	 * @return entity with passed id or null if not found
	 * @throws SQLException 
	 */
	T findOne(String id) throws SQLException;

	/**
	 * Return back all existing entities.
	 * 
	 * @return list of existing entities, empty list if there are no entities
	 * @throws SQLException 
	 * @throws JAXBException
	 */
	List<T> findAll() throws SQLException, DatatypeConfigurationException; 

	/**
	 * Save entity and return saved instance (with id set).
	 * 
	 * @param entity
	 *            to be saved
	 * @return saved instance
	 * @throws SQLException 
	 * @throws FileNotFoundException
	 * @throws JAXBException
	 */
	void save(T object) throws SQLException;

	/**
	 * Remove entity with passed id.
	 * 
	 * @param id
	 *            of the entity to be removed
	 * @throws SQLException 
	 * @throws IllegalArgumentException
	 *             if there is no entity with passed id
	 */
	void remove(String id) throws SQLException;
	
	void update(T object) throws SQLException;
}
